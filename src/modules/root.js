import BaseModule from './base'

class RootModule extends BaseModule {
  async _init() {
    console.log('loading root...')
  }
  async setup(data) {
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

export default RootModule