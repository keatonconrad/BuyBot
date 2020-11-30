import * as fs from 'fs'
import { GluegunToolbox } from 'gluegun'
import * as schedule from 'node-schedule'
import { TARGET, WALMART, BEST_BUY } from '../contants'
import { scrapeTarget } from '../utils/scrape-target-util'
import { scrapeDirect } from '../utils/scrape-direct-util'
import { scrapeWalmart } from '../utils/scrape-walmart-util'
import { scrapeBestBuy } from '../utils/scrape-bestbuy-util'


module.exports = (toolbox: GluegunToolbox) => {
  toolbox.scrape = async (site: string) => {
    const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'))
    const cronJobSchedule = config.cronSchedule

    let scraperToRun = scrapeDirect

    if (site === TARGET) {
      scraperToRun = scrapeTarget
    } else if (site === WALMART) {
      scraperToRun = scrapeWalmart
    } else if (site === BEST_BUY) {
      scraperToRun = scrapeBestBuy
    }

    if (!cronJobSchedule) {
      await scraperToRun(config)
    } else {
      toolbox.print.info('Scheduled BuyBot for checkout')
      schedule.scheduleJob(cronJobSchedule, async () => {
        await scraperToRun(config)
      })
    }
  }
}
