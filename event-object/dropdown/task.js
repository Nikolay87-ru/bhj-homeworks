function initDropdowns() {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(dropdown => {
    const dropdownValue = dropdown.querySelector('.dropdown__value');
    // let selectedItemOfList = dropdownValue.textContent;
    // dropdownValue.textContent = selectedItemOfList;
    const dropdownList = dropdown.querySelector('.dropdown__list');
    const dropdownLinks = dropdown.querySelectorAll('.dropdown__link');

    const setActiveList = () => {
      dropdownValue.addEventListener('click', () => {
        dropdownList.classList.toggle('dropdown__list_active');
      });
    }

    setActiveList();

    const selectItemOfList = () => {
      dropdownLinks.forEach(link => {
        link.addEventListener('click', (event) => {
          event.preventDefault(); 
          dropdownValue.textContent = link.textContent; 
          dropdownList.classList.remove('dropdown__list_active'); 
        });
      });
    }

    selectItemOfList();
  });
}

initDropdowns();