import { GluegunToolbox } from 'gluegun'
import { PLAYSTATION_DIRECT, TARGET, WALMART, BEST_BUY } from '../contants'

module.exports = {
  name: 'scrape',
  alias: ['s'],
  description: 'Runs the webscraper',
  run: async (toolbox: GluegunToolbox) => {
    // retrieve the tools from the toolbox that we will need
    const { scrape, prompt } = toolbox

    const { sitesToScrape }: { sitesToScrape: string[] } = await prompt.ask({
      type: 'multiselect',
      name: 'sitesToScrape',
      message: `Which sites do you want to scrape? (press space to select)`,
      choices: [PLAYSTATION_DIRECT, TARGET, WALMART, BEST_BUY]
    })

    if (sitesToScrape.length === 0) {
      await Promise.all([
        scrape(WALMART),
        scrape(TARGET),
        scrape(PLAYSTATION_DIRECT),
        scrape(BEST_BUY)
      ].map(p => p.catch(e => e)))
    } else {
      let scraper_funcs = [];
      if (sitesToScrape.includes(WALMART)) {
        scraper_funcs.push(scrape(WALMART))
      }
      if (sitesToScrape.includes(TARGET)) {
        scraper_funcs.push(scrape(TARGET))
      }
      if (sitesToScrape.includes(PLAYSTATION_DIRECT)) {
        scraper_funcs.push(scrape(PLAYSTATION_DIRECT))
      }
      if (sitesToScrape.includes(BEST_BUY)) {
        scraper_funcs.push(scrape(BEST_BUY))
      }
      await Promise.all(scraper_funcs.map(p => p.catch(e => e)))
    }
  }
}
