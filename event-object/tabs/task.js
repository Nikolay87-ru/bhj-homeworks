class Tabs {
  constructor(container) {
    this.container = container;
    this.tabs = Array.from(container.querySelectorAll(".tab"));
    this.tabsContent = Array.from(container.querySelectorAll(".tab__content"));

    this.initTabs();
  }

  initTabs() {
    this.tabs.forEach((tab) => {
      tab.addEventListener("click", (event) =>
        this.setActiveTab(event.currentTarget)
      );
    });
  }

  setActiveTab(clickedTab) {
    const indexClickedTab = this.tabs.indexOf(clickedTab);

    this.tabs.forEach((tab) => {
      if (tab.classList.contains("tab_active")) {
        tab.classList.remove("tab_active");
      }
    });

    this.tabsContent.forEach((content) => {
      if (content.classList.contains("tab__content_active")) {
        content.classList.remove("tab__content_active");
      }
    });

    if (indexClickedTab >= 0) {
      clickedTab.classList.add("tab_active");
      this.tabsContent[indexClickedTab].classList.add("tab__content_active");
    }
  }
}

document.querySelectorAll(".tabs").forEach((tabsContainer) => {
  new Tabs(tabsContainer);
});
