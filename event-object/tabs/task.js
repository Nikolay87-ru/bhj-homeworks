class Tabs {
  constructor(container) {
      this.container = container;
      this.tabs = Array.from(container.querySelectorAll('.tab'));
      this.contents = Array.from(container.querySelectorAll('.tab__content'));

      this.initTabs()
  }

  initTabs() {
      this.tabs.forEach(tab => {
          tab.addEventListener('click', (event) => this.setActiveTab(event.currentTarget));
      });
  }

  setActiveTab(activeTab) {
      const indexTab = this.tabs.indexOf(activeTab);

      this.tabs.forEach(tab => tab.classList.remove('tab_active'));
      this.contents.forEach(content => content.classList.remove('tab__content_active'));

      activeTab.classList.add('tab_active');
      this.contents[indexTab].classList.add('tab__content_active');
  }
}

  new Tabs(document.querySelectorAll('.tabs'));

