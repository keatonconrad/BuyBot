import * as fs from 'fs'
import { GluegunCommand } from 'gluegun'
import {
  input,
  inputSchedule,
  inputTargetEmailPassword
} from '../utils/buybot-util'

const command: GluegunCommand = {
  name: 'buybot',
  run: async toolbox => {
    const { prompt, print } = toolbox
    print.info(`
    Welcome to the BuyBot CLI. Please enter your checkout info in the following prompts.
    All data will only be stored in your computer.
    You can choose to fill out the configs in config.json based on the template provided in README.md.
    `)
    const cronSchedule = await inputSchedule(prompt)
    const firstName = await input('firstName', prompt, print)
    const lastName = await input('lastName', prompt, print)
    const phoneNumber = await input('phoneNumber', prompt, print)
    const email = await input('email', prompt, print)
    const state = await input('state', prompt, print)
    const city = await input('city', prompt, print)
    const address = await input('address', prompt, print)
    const zipCode = await input('zipCode', prompt, print)
    const creditCardNumber = await input('creditCardNumber', prompt, print)
    const expirationMonth = await input('expirationMonth', prompt, print)
    const expirationYear = await input('expirationYear', prompt, print)
    const cvv = await input('cvv', prompt, print)
    const targetLink = await input('targetLink', prompt, print)
    const walmartLink = await input('walmartLink', prompt, print)
    const bestBuyLink = await input('bestBuyLink', prompt, print)
    const directLink = await input('directLink', prompt, print)


    print.info(`
    ...Saving config...
    The next settings are optional.
    `)
    const config: { [key: string]: string } = {
      firstName,
      lastName,
      phoneNumber,
      email,
      state,
      city,
      address,
      zipCode,
      creditCardNumber,
      expirationMonth,
      expirationYear,
      cvv,
      cronSchedule,
      targetLink,
      walmartLink,
      bestBuyLink,
      directLink
    }
    fs.writeFileSync('config.json', JSON.stringify(config, null, 4))

    const isScrapeTarget = await toolbox.prompt.confirm(
      'Do you want to scrape Target?'
    )
    let targetEmailPassword: { [key: string]: string } = {}
    if (isScrapeTarget) {
      targetEmailPassword = await inputTargetEmailPassword(prompt, print, email)
      config.targetEmail = targetEmailPassword.email
      config.targetPassword = targetEmailPassword.password
    }

    print.info(`
    ...Saving final config...
    `)
    fs.writeFileSync('config.json', JSON.stringify(config, null, 4))

    print.info(`
    We're ready to go. Enter the following comand to run the scraper:

      buybot scrape
    `)
  }
}

module.exports = command
