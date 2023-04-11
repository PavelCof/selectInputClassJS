class SelectInput extends HTMLElement {
    static get observedAttributes() {
      return ['value', 'valueid'];
    }
  
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.options = [];
      this.selectedIndex = -1;
      this.createListElement();
      this.shadowRoot.appendChild(this.list);
  
      this.input = document.createElement('input');
      this.input.classList.add('select-input__input');
      this.input.addEventListener('input', () => {
        this.filterOptions();
      });
      this.input.addEventListener('click', () => {
        this.showList();
      });
      this.shadowRoot.appendChild(this.input);
  
      this.hideList();

      // this.input.addEventListener('blur', () => {
      //   this.hideList();
      // });


      
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'value') {
        const selectedOption = this.options.find(option => option.value === newValue);
        if (selectedOption) {
          this.selectOption(selectedOption);
        }
      } else if (name === 'valueid') {
        this.valueid = newValue;
      }
    }
  
    createListElement() {
      this.list = document.createElement('ul');
      this.list.classList.add('select-input__list');
      this.list.addEventListener('click', (event) => {
        const optionItem = event.target.closest('li');
        if (optionItem) {
          const selectedOption = this.options.find(option => option.value === optionItem.dataset.value);
          this.selectOption(selectedOption);
        }
      });
    }
  
    addOption(label, value, valueid) {
      
      const listItem = document.createElement('li');
      listItem.textContent = label;
      listItem.dataset.value = value;
      listItem.dataset.valueid = valueid;
      this.list.appendChild(listItem);

   
    }
  
    selectOption(option) {
      this.value = option.value;
      this.valueid = option.valueid;
      this.input.value = option.label;
      this.hideList();
    }
  
    showList() {
      this.list.style.display = 'block';
    }
  
    hideList() {
      this.list.style.display = 'none';
    }
  
    filterOptions() {
      const filterValue = this.input.value.trim().toLowerCase();
      this.options.length=0
      console.log(this.options);
      Array.from(this.children).forEach(child => {
        if (child.tagName === 'OPTION') {
          const label = child.textContent;
          const value = child.getAttribute('value');
          const valueid = child.getAttribute('valueid');
          this.addOption(label, value, valueid);
          const option = { label, value, valueid };
          this.options.push(option);
        }
      });
      
      const filteredOptions = this.options.filter(
        (option) => option.label.toLowerCase().indexOf(filterValue) !== -1
      );
      console.log(this.options, filteredOptions);
      this.list.innerHTML = "";
    
      filteredOptions.forEach((option) => {
        console.log(option);
        this.addOption(option.label, option.value, option.valueid);
      });



      if (filteredOptions.length > 0) {
        this.showList();
      } else {
        this.hideList();
      }
    //   if(!this.input.value.trim()){
    //     Array.from(this.children).forEach(child => {
    //         if (child.tagName === 'OPTION') {
    //           const label = child.textContent;
    //           const value = child.getAttribute('value');
    //           const valueid = child.getAttribute('valueid');
    //           this.addOption(label, value, valueid);
    //           const option =  { label, value, valueid };
    //           this.options.push(option);
    //         }
    //   })}
    }
  
    connectedCallback() {
      const value = this.getAttribute('value');
      if (value !== null) {
        this.value = value;
        const selectedOption = this.options.find(option => option.value === value);
        if (selectedOption) {
          this.input.value = selectedOption.label;
        }
      }
      this.options.length=0
      Array.from(this.children).forEach(child => {
        if (child.tagName === 'OPTION') {
          const label = child.textContent;
          const value = child.getAttribute('value');
          const valueid = child.getAttribute('valueid');
          this.addOption(label, value, valueid);
          const option =  { label, value, valueid };
          this.options.push(option);
        }
      });
    }



    get value() {
      return this.getAttribute('value');
    }
    set value(newValue) {
      this.setAttribute('value', newValue);
    }
    get valueid() {
      return this.getAttribute('valueid');
    }
    set valueid(newValue) {
      this.setAttribute('valueid', newValue);
    }
  }
  
  customElements.define('select-input', SelectInput);
  