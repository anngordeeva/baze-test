// модальное окно 

const institutionModal = document.getElementById("institutionModal"),
  addressModal = document.getElementById("addressModal"),
  housingModal = document.getElementById("housingModal"),
  institutionBtn = document.getElementById("institution-btn"),
  addressBtn = document.getElementById("address-btn"),
  housingBtn = document.getElementById("housing-btn")
btnClose = document.getElementById("btn-close"),
  btnCloseAddress = document.getElementById("btn-close-address"),

  institutionBtn.addEventListener("click", () => {
    institutionModal.classList.remove("hidden")
  })
addressBtn.addEventListener("click", () => {
  addressModal.classList.remove("hidden")
})
housingBtn.addEventListener("click", () => {
  housingModal.classList.remove("hidden")
})
btnClose.addEventListener("click", () => {
  institutionModal.classList.add("hidden")
})
btnCloseAddress.addEventListener("click", () => {
  addressModal.classList.add("hidden")
})

const btnCloseHousing = document.getElementById("btn-close-housing");

btnCloseHousing.addEventListener("click", () => {
  housingModal.classList.add("hidden")
})


// валидация 

function validation(form) {

  function createError(input, text) {
    const parent = input.parentNode,
      errorLabel = document.createElement('span');

    errorLabel.classList.add('error__text')
    errorLabel.textContent = text

    parent.classList.add('error')
    parent.append(errorLabel)
  }

  function removeError(input) {
    const parent = input.parentNode;

    if (parent.classList.contains('error')) {
      parent.querySelector('.error__text').remove()
      parent.classList.remove('error')
    }
  }

  let result = true;


  form.querySelectorAll('input').forEach(input => {
    if (input.value == '') {
      createError(input, 'Поле не заполнено')
      result = false
    } else removeError(input)
  });

  return result
}

// получение данных из формы организация 

function createInstitution() {
  const newObj = document.createElement("div"),
    newObjHeader = document.createElement("div"),
    btn = document.createElement("button");

  newObj.classList.add("wrapper-card")
  newObjHeader.classList.add("modal__header")
  btn.classList.add("modal__btn-close", "modal__btn-appdate")

  btn.textContent = "Редактировать"

  btn.addEventListener("click", () => {
    institutionModal.classList.remove("hidden")
  })

  newObj.append(newObjHeader)

  const form = document.getElementById("institutionModal"),
    select = document.getElementById("select"),
    name = document.getElementById("name"),
    description = document.getElementById("description"),
    images = document.getElementById("images"),
    container = document.getElementById("institution"),
    textContent = document.getElementById("institution-wrapper-center"),
    containerTitle = document.getElementById("institution-title");

  const textWrapperSelect = document.createElement("div"),
    textWrapperName = document.createElement("div"),
    textWrapperDescription = document.createElement("div"),
    textWrapperImages = document.createElement("div"),
    descrSelect = document.createElement("p"),
    descrName = document.createElement("p"),
    descrDescription = document.createElement("p"),
    descrImages = document.createElement("img"),
    titleSelect = document.createElement("h3"),
    titleName = document.createElement("h3"),
    titleDescription = document.createElement("h3"),
    titleImages = document.createElement("h3");


  descrImages.setAttribute("src", "#")

  textWrapperSelect.classList.add("text-wrapper")
  textWrapperName.classList.add("text-wrapper")
  textWrapperDescription.classList.add("text-wrapper")
  textWrapperImages.classList.add("text-wrapper")
  descrSelect.classList.add("title-small")
  descrName.classList.add("title-small")
  descrDescription.classList.add("title-small")
  descrImages.classList.add("logo")
  titleSelect.classList.add("title-card")
  titleName.classList.add("title-card")
  titleDescription.classList.add("title-card")
  titleImages.classList.add("title-card")

  titleSelect.textContent = "Тип"
  titleName.textContent = "Название организации"
  titleDescription.textContent = "Описание"
  titleImages.textContent = "Логотип"

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (validation(this) == true) {
      descrSelect.textContent = select.value,
        descrName.textContent = name.value,
        descrDescription.textContent = description.value,
        descrImages.src = URL.createObjectURL(images.files[0]);

      newObjHeader.append(containerTitle, btn)
      textWrapperSelect.append(titleSelect, descrSelect)
      textWrapperName.append(titleName, descrName)
      textWrapperDescription.append(titleDescription, descrDescription)
      textWrapperImages.append(titleImages, descrImages)

      newObj.append(textWrapperSelect, textWrapperName, textWrapperDescription, textWrapperImages)
      container.append(newObj)
      textContent.classList.add("hidden")
      institutionModal.classList.add("hidden")
    }
  })
}
createInstitution()


// получение данных из формы корпусы

let housings = [];
let housingNodes = [];
const emptyHousing = document.getElementById("housing-item").cloneNode(true);

const form = document.forms.housing,
  btnAdd = document.getElementById("housing-btn-add"),
  housingList = document.getElementById("housing-list"),
  housingItem = document.getElementById("housing-item");

  housingItem.setAttribute("id", "housing-item-1")
  housingNodes.push({ node: housingItem, title: 'Корпус 1' });

const handleBtnAddClick = (event) => {
  event.preventDefault();

  const btnDelite = document.createElement("button");
  btnDelite.classList.add("btn-delite")

  const newHousing = emptyHousing.cloneNode(true)

  newHousing.setAttribute("id", `housing-item-${housingNodes.length + 1}`)

  const housingTitle = newHousing.querySelector("h2")

  const title = `Корпус ${housingNodes.length + 1}`;
  housingNodes.push({ node: newHousing, title })

  housingTitle.textContent = `Корпус ${housingNodes.length}`


  btnDelite.addEventListener("click", function deleteHousing (event) {
    newHousing.remove();
    housingNodes = housingNodes.filter(node => node.title !== title).map((node, i) => ({
      ...node,
      title: `Корпус ${i + 1}`
    }));

    for(const node of housingNodes) {
      node.node.querySelector("h2").textContent = `${node.title}`
    }
    btnDelite.removeEventListener("click", deleteHousing)
  })

  newHousing.prepend(btnDelite)
  housingList.append(newHousing)
}

btnAdd.addEventListener("click", handleBtnAddClick)

const handleOnSubmit = (event) => {
  event.preventDefault();
  housings = [];
  for (const housing of housingNodes) {
    const housingValues = {
      title: housing.title,
      name: housing.node.querySelector("[name='title']")?.value,
      rooms: housing.node.querySelector("[name='rooms']")?.value,
      floors: housing.node.querySelector("[name='floors']")?.value,
    }
    housings.push(housingValues);
  }
  const textContent = document.getElementById("housing-wrapper-center");
  textContent.classList.add("hidden")
  housingModal.classList.add("hidden")

  renderHousingList()
}

form.addEventListener("submit", handleOnSubmit)

function renderHousingList() {
  const container = document.getElementById("housing"),
    containerTitle = document.getElementById("housing-title");

  const oldObj = document.getElementById("housing-item-wrapper");
  oldObj && oldObj.remove();

  const newObj = document.createElement("div"),
    newObjHeader = document.createElement("div"),
    btn = document.createElement("button");

  newObj.setAttribute("id", "housing-item-wrapper");

  newObj.classList.add("wrapper-card")
  newObjHeader.classList.add("modal__header")
  btn.classList.add("modal__btn-close", "modal__btn-appdate")

  btn.textContent = "Редактировать"

  btn.addEventListener("click", () => {
    housingModal.classList.remove("hidden")
  })

  newObj.append(newObjHeader)
  newObjHeader.append(containerTitle, btn)
  container.append(newObj)

  const housingList = document.createElement("ul")
  housingList.classList.add("housing__list")

  for (const housingValues of housings) {
    housingList.append(createHousingListItem(housingValues))
  }
  newObj.append(housingList)
}

function createHousingListItem(values) {
  const itemHousing = document.createElement("li"),
    wrapperText = document.createElement("div"),
    textWrapperName = document.createElement("div"),
    textWrapperFloors = document.createElement("div"),
    textWrapperRooms = document.createElement("div"),
    titleElem = document.createElement("h2")
    descrName = document.createElement("p"),
    descrFloors = document.createElement("p"),
    descrRooms = document.createElement("p"),
    titleName = document.createElement("h3"),
    titleFloors = document.createElement("h3"),
    titleRooms = document.createElement("h3");
    

  itemHousing.classList.add("housing__item")
  wrapperText.classList.add("housing-container")
  titleElem.classList.add("title-middle")
  textWrapperName.classList.add("text-wrapper")
  textWrapperFloors.classList.add("text-wrapper")
  textWrapperRooms.classList.add("text-wrapper")
  descrName.classList.add("title-small")
  descrFloors.classList.add("title-small")
  descrRooms.classList.add("title-small")
  titleName.classList.add("title-card")
  titleFloors.classList.add("title-card")
  titleRooms.classList.add("title-card")

  titleName.textContent = "Название"
  titleRooms.textContent = "Количество этажей"
  titleFloors.textContent = "Количество номеров"
  titleElem.textContent = values.title;

  descrName.textContent = values.name;
  descrFloors.textContent = values.floors;
  descrRooms.textContent = values.rooms;

  textWrapperName.append(titleName, descrName)
  textWrapperFloors.append(titleFloors, descrFloors)
  textWrapperRooms.append(titleRooms, descrRooms)
  itemHousing.append(titleElem, wrapperText)
  wrapperText.append(textWrapperName, textWrapperRooms, textWrapperFloors)
  return itemHousing;
}

// получение данных из формы адрес 

function createAddress() {
  const newObj = document.createElement("div"),
    newObjHeader = document.createElement("div"),
    btn = document.createElement("button");

  newObj.classList.add("wrapper-card")
  newObjHeader.classList.add("modal__header")
  btn.classList.add("modal__btn-close", "modal__btn-appdate")

  btn.textContent = "Редактировать"

  newObj.append(newObjHeader)

  btn.addEventListener("click", () => {
    addressModal.classList.remove("hidden")
  })

  const form = document.getElementById("address"),
    select = document.getElementById("select-address"),
    area = document.getElementById("area"),
    adds = document.getElementById("adds"),
    index = document.getElementById("index"),
    container = document.getElementById("address-container"),
    textContent = document.getElementById("address-wrapper-center"),
    containerTitle = document.getElementById("address-title");

  const textWrapperSelect = document.createElement("div"),
    textWrapperArea = document.createElement("div"),
    textWrapperAdds = document.createElement("div"),
    textWrapperIndex = document.createElement("div"),
    descrSelect = document.createElement("p"),
    descrArea = document.createElement("p"),
    descrAdds = document.createElement("p"),
    descrIndex = document.createElement("p"),
    titleSelect = document.createElement("h3"),
    titleArea = document.createElement("h3"),
    titleAdds = document.createElement("h3"),
    titleIndex = document.createElement("h3");

  textWrapperSelect.classList.add("text-wrapper")
  textWrapperArea.classList.add("text-wrapper")
  textWrapperAdds.classList.add("text-wrapper")
  textWrapperIndex.classList.add("text-wrapper")
  descrSelect.classList.add("title-small")
  descrArea.classList.add("title-small")
  descrAdds.classList.add("title-small")
  descrIndex.classList.add("title-small")
  titleSelect.classList.add("title-card")
  titleArea.classList.add("title-card")
  titleAdds.classList.add("title-card")
  titleIndex.classList.add("title-card")

  titleSelect.textContent = "Регион"
  titleArea.textContent = "Район"
  titleAdds.textContent = "Адрес:"
  titleIndex.textContent = "Почтовый индекс"

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    // if (validation(this) == true) {
    descrSelect.textContent = select.value,
      descrArea.textContent = area.value,
      descrAdds.textContent = adds.value,
      descrIndex.textContent = index.value,

      newObjHeader.append(containerTitle, btn)
    textWrapperSelect.append(titleSelect, descrSelect)
    textWrapperArea.append(titleArea, descrArea)
    textWrapperAdds.append(titleAdds, descrAdds)
    textWrapperIndex.append(titleIndex, descrIndex)

    newObj.append(textWrapperSelect, textWrapperArea, textWrapperAdds, textWrapperIndex)
    container.append(newObj)
    textContent.classList.add("hidden")
    addressModal.classList.add("hidden")
    // }
  })
}
createAddress()

// выпадающий список

const institutionSelect = () => {
  const element = document.querySelector('.js-choice');
  const choices = new Choices(element, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
  });
}
institutionSelect();

const addressSelect = () => {
  const element = document.querySelector('.address-js-choice');
  const choices = new Choices(element, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
  });
}
addressSelect();

// инпут с изображением

const dropContainer = document.getElementById("dropcontainer")
const fileInput = document.getElementById("images")

dropContainer.addEventListener("dragover", (e) => {
  e.preventDefault()
}, false)

dropContainer.addEventListener("dragenter", () => {
  dropContainer.classList.add("drag-active")
})

dropContainer.addEventListener("dragleave", () => {
  dropContainer.classList.remove("drag-active")
})

dropContainer.addEventListener("drop", (e) => {
  e.preventDefault()
  dropContainer.classList.remove("drag-active")
  fileInput.files = e.dataTransfer.files
})

// видимость изображения при загрузке
const previewFile = () => {
  const textContent = document.getElementById("textContent"),
    container = document.getElementById("dropcontainer"),
    preview = document.querySelector("img"),
    file = document.querySelector("input[type=file]").files[0];

  const reader = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file),
      textContent.classList.add("hidden"),
      container.classList.add("fit-content");
  } else {
    preview.src = "",
      textContent.classList.remove("hidden"),
      container.classList.remove("fit-content");
  }
}
