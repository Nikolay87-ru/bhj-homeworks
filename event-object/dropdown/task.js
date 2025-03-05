function initDropdowns() {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(dropdown => {
    const dropdownValue = dropdown.querySelector('.dropdown__value');
    const dropdownList = dropdown.querySelector('.dropdown__list');
    const dropdownLinks = dropdown.querySelectorAll('.dropdown__link');

    const setActiveList = () => {
      dropdownValue.addEventListener('click', () => {
        dropdownList.classList.toggle('dropdown__list_active');
      });
    }

    setActiveList();

    const selectItemOfList = () => {
      dropdownLinks.forEach(listItem => {
        listItem.addEventListener('click', (clickOnLink) => {
          clickOnLink.preventDefault(); 
          dropdownValue.textContent = listItem.textContent; 
          dropdownList.classList.remove('dropdown__list_active'); 
        });
      });
    }

    selectItemOfList();
  });
}

initDropdowns();