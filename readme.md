# PS5bot


ps5bot is a dead simple auto-checkout bot to buy a PlayStation 5 from PlayStation Direct, Target, Walmart, and Best Buy.

## Installation overview

Linux, macOS, and Windows are all capable operating systems.

You do not need any computer skills, smarts, or anything of that nature. You are very capable as you have made it this far. Some basic understanding how a terminal, git, and or Node.js is a bonus, but that does not limit you to getting PS5bot running!

### Installation

 1. [Install Node.js](https://nodejs.org/en/)
    1. version should be >12.9
 2. [Install git](https://git-scm.com/)
 3. download this project
    1. `git clone https://github.com/VVNoodle/PS5bot`
 4. Open up a terminal
 5. go to project directory `cd /ps5bot`
 6. Install `yarn` by running `npm i -g yarn`
 7. Install dependencies by running `yarn`
 8. Make CLI callable  
    `yarn link`  

## Setup

 1. Run ps5bot. You'll be prompted to fill in required checkout info  
    `ps5bot`  
    **Note: Below steps are still TODO**  
 2. Run scraper
    `ps5bot scrape`
    - you will be asked to select the sites to run the bot. If you don't select anything, it will try to run on all websites.

## Bot Configs

Configs are read in `config.json` file. You can either run `ps5bot` to generate a config file, or duplicate `configTemplate.json`, rename to `config.json`, and fill out the fields.

```json
{
  "firstName": "Qwer",
  "lastName": "Ty",
  "phoneNumber": "8011111111",
  "email": "email@example.com",
  "state": "State",
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

Make sure to run this script and keep the terminal open around the time of the schedule

## Notes

- Make sure not to use a VPN since it will possibly trigger captcha verification.
- There's a chance WalMart checkout ask for captcha after entering address. If this is the case, bot will pause. As soon as you complete them, bot will resume.
- You need a login for Target. And make sure no existing carts.

PS5bot exists to:

- practice web scraping and to
- buy a **single** PS5 for myself  
The second point is fair imo since it's pretty much an automated version of constantly clicking refresh to buy stuff.  
Also: This is not intended to scalp massive quantities of PS5s. That shit aint cool.
