'use strict';

const tabs = document.getElementById('tabs');
const tabsNav = tabs.querySelector('.tabs-nav');
const tabsContent = tabs.querySelector('.tabs-content');
const articlesList = tabsContent.children;
const tabTmpl = tabsNav.removeChild(tabsNav.firstElementChild);

Array.from(articlesList).forEach((article, i) => {
  article.classList.add('hidden');
  renderTab(article, i + 1);
});

articlesList[0].classList.remove('hidden');

function renderTab(article, index) {
  const tabIcon = article.dataset.tabIcon;
  const tabTitle = article.dataset.tabTitle;
  const tabNavItem = tabTmpl.cloneNode(true);
  const tabNavLink = tabNavItem.firstElementChild;

  tabNavLink.classList.add(tabIcon);
  tabNavLink.textContent = tabTitle;

  tabNavLink.addEventListener('click', (event) => {
    event.preventDefault();

    const listLi = tabsNav.children;
    const currentLi = event.target.parentElement;
    const currentArticle = tabsContent.querySelector(`[data-tab-title=${event.target.textContent}]`);

    for (let item of listLi) {
      item.classList.remove('ui-tabs-active');
    }

    for (let itemArticle of articlesList) {
      itemArticle.classList.add('hidden');
    }

    currentLi.classList.add('ui-tabs-active');
    currentArticle.classList.remove('hidden');
  });

  tabsNav.appendChild(tabNavItem);

  if (index === 1) {
    tabNavItem.classList.add('ui-tabs-active');
  }
}
