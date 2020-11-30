# BuyBot

BuyBot is a simple auto-checkout bot to buy a product from PlayStation Direct, Target, Walmart, and/or Best Buy.

## Installation Overview

Linux, macOS, and Windows are all capable operating systems.

You do not need any computer skills, smarts, or anything of that nature. You are very capable as you have made it this far. Some basic understanding how a terminal, git, and or Node.js is a bonus, but that does not limit you to getting BuyBot running!

### Installation

 1. [Install Node.js](https://nodejs.org/en/)
 2. [Install git](https://git-scm.com/)
 3. Clone this repo
    `git clone https://github.com/keatonconrad/BuyBot`
 4. Go to the project directory `cd BuyBot`
 5. Install dependencies by running `npm install`
 6. Make the CLI callable by running `yarn link`  

## Usage

 1. Run BuyBot by running the `buybot` command. You'll be prompted to fill in required checkout info.
 2. Run the scraper with `buybot scrape`
    - you will be asked to select the sites to run the bot. If you don't select anything, it will try to run on all websites.

## Bot Configs

Configs are read in `config.json` file. You can either run `buybot` to generate a config file, or duplicate `configTemplate.json`, rename to `config.json`, and fill out the fields.

```json
{
  "firstName": "Qwer",
  "lastName": "Ty",
  "phoneNumber": "8011111111",
  "email": "email@example.com",
  "state": "State",
  "shortState": "ST",
  "city": "Random City",
  "address": "2353 Running Water Ct.",
  "zipCode": "95054",
  "creditCardNumber": "0101101010101",
  "expirationMonth": "10",
  "expirationYear": "2022",
  "cvv": "000",
  "targetLink": "https://www.target.com/p/playstation-5-console/-/A-81114595",
  "walmartLink": "https://www.walmart.com/ip/PlayStation-5-Console/363472942",
  "bestBuyLink": "https://www.bestbuy.com/site/sony-playstation-5-console/6426149.p",
  "directLink": "https://direct.playstation.com/en-us/consoles/console/playstation5-console.3005816",
  "targetEmail": "email2@example.com",
  "targetPassword": "1312321"
}
```

- Double quotes on text is required
- Anything after the `//` are comments for clarification. Remove them if you try to copy paste this example (including the `//`).
- for Target, make sure you have no carts in your account already

### Credit Cards supported

| Site               | Cards                                        |
|--------------------|----------------------------------------------|
| PlayStation Direct | MasterCard, Visa, Discover                   |
| Walmart            | MasterCard, Visa, Discover, American Express |
| Target             | MasterCard, Visa, Discover, American Express |
| Best Buy           | MasterCard, Visa, Discover, American Express |

Make sure to run this script and keep the terminal open around the time of the schedule

## Notes

- Make sure not to use a VPN since it will possibly trigger captcha verification.
- There's a chance WalMart checkout ask for captcha after entering address. If this is the case, bot will pause. As soon as you complete them, bot will resume.
- You need a login for Target. And make sure no existing carts.

BuyBot is **not** intended to scalp large quantities of products. BuyBot is only intended for personal use, not for scalping. Please don't use BuyBot for anything scammy, scummy, or otherwise immoral.

## Credit

BuyBot is originally adapted from [PS5bot](https://github.com/VVNoodle/PS5bot) by [VVNoodle](https://github.com/VVNoodle).
