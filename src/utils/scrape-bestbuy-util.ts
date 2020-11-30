import * as puppeteer from 'puppeteer'
import * as notifier from 'node-notifier'

export const scrapeBestBuy = async (config: { [key: string]: string }) => {
  const {
    email,
    phoneNumber,
    firstName,
    lastName,
    city,
    zipCode,
    address,
    creditCardNumber,
    expirationMonth,
    expirationYear,
    cvv
  } = config

  const browser = await puppeteer.launch({
    headless: false,
    args: ['--window-size=1920,1080'],
    defaultViewport: null
  })

  try {
    const page = await browser.newPage()
    await page.setRequestInterception(true)

    page.on('request', async req => {
      if (req.resourceType() === 'image') {
        await req.abort()
      } else {
        await req.continue()
      }
    })

    await page.goto(
      'https://www.bestbuy.com/site/sony-playstation-5-console/6426149.p'
    )

    // keep refreshing until "Add to Cart is visible"
    while (true) {
      try {
        await page.waitForSelector(
          'button.add-to-cart-button',
          {
            timeout: 10000
          }
        )
        break
      } catch (error) {
        await page.reload()
      }
    }

    const addToCartButton = await page.$(
      'button.add-to-cart-button'
    )
    await addToCartButton.click()

    await page.waitForTimeout(6000)

    const cartButton = await page.$(
      'div.go-to-cart-button>a'
    )
    await cartButton.click()

    await page.waitForTimeout(6000)

    const checkoutButton = await page.$(
      'button[data-track="Checkout - Top"]'
    )
    await checkoutButton.click()

    await page.waitForTimeout(6000)

    const continueAsGuestButton = await page.$(
      'button.cia-guest-content__continue.guest'
    )
    await continueAsGuestButton.click()

    await page.waitForTimeout(6000)

    const switchToShippingButton = await page.$(
      'a.ispu-card__switch'
    )
    if (switchToShippingButton) {
      await switchToShippingButton.click()
      await page.waitForTimeout(2000)
    }

    await page.type('input[id="consolidatedAddresses.ui_address_2.firstName"]', firstName)
    await page.type('input[id="consolidatedAddresses.ui_address_2.lastName"]', lastName)
    await page.type('input[id="consolidatedAddresses.ui_address_2.street"]', address)
    await page.type('input[id="consolidatedAddresses.ui_address_2.city"]', city)
    await page.type('select[id="consolidatedAddresses.ui_address_2.state"]', 'KS')
    await page.type('input[id="consolidatedAddresses.ui_address_2.zipcode"]', zipCode)

    await page.type('input[id="user.emailAddress"]', email)
    await page.type('input[id="user.phone"]', phoneNumber)

    const [continueToPaymentButton] = await page.$x("//button[contains(., 'Continue to Payment Information')]")
    await continueToPaymentButton.click()

    // wait for possible captcha
    await page.waitForSelector('input[id="optimized-cc-card-number"]', {
      timeout: 900000
    })
    await page.type('input[id="optimized-cc-card-number"]', creditCardNumber)
    await page.select('select[name="expiration-month"]', expirationMonth)

    await page.select('select[name="expiration-year"]', expirationYear)

    await page.type('input[id="credit-card-cvv"]', cvv)


    notifier.notify({
      title: 'Best Buy',
      message: 'Ready to place order!',
      sound: true
    })
  } catch (error) {
    console.error(error)
  } finally {
    // await browser.close();
  }
}
