(()=>{"use strict";var t="03a967f6-55ee-4e4e-b7f8-c5d21e5db7dc",e="https://nomoreparties.co/v1/wff-cohort-16/",n=document.querySelector("#card-template").content;function o(o,r,c,a){var i=n.querySelector(".card").cloneNode(!0),u=i.querySelector(".card__title"),l=i.querySelector(".card__image");l.src=o.link,l.alt="Фото. Пейзаж. ".concat(o.name),u.textContent=o.name,i.querySelector(".card__delete-button").addEventListener("click",(function(){var n;(n=o,fetch("".concat(e,"cards/").concat(n._id),{method:"DELETE",headers:{authorization:t,"Content-Type":"application/json"}})).then((function(){i.remove()}))})),l.addEventListener("click",(function(){return r(l,u.textContent)}));var p=i.querySelector(".card__like-counter");p.textContent=o.likes.length;var s=i.querySelector(".card__like-button");o.likes.some((function(t){return"9ba15da7537acf3e06b7d4bc"===t._id}))&&s.classList.add("card__like-button_is-active");var d;return d=!!s.classList.contains("card__like-button_is-active"),s.addEventListener("click",(function(){c(s,d,p,o)})),i}function r(t){t.classList.add("popup_is-opened"),document.addEventListener("keydown",a)}function c(t){t.classList.remove("popup_is-opened"),document.removeEventListener("keydown",a)}function a(t){"Escape"===t.key&&c(document.querySelector(".popup_is-opened"))}function i(t,e){!function(t){return t.some((function(t){return!t.validity.valid}))}(t)?(e.classList.remove("button_inactive"),e.removeAttribute("disabled")):(e.classList.add("button_inactive"),e.setAttribute("disabled",""))}function u(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}var l=document.querySelector(".popup_type_image"),p=document.querySelector(".popup_type_image .popup__content .popup__image"),s=document.querySelector(".popup_type_image .popup__content .popup__caption"),d=document.querySelector(".profile__edit-button"),_=document.querySelector(".page .content .places__list"),f=(document.querySelector("#card-template").content,document.querySelector(".popup_type_edit")),m=document.querySelector(".profile__add-button"),y=document.querySelector(".popup_type_new-card"),v=document.querySelectorAll(".popup"),h=document.querySelector(".popup__form"),b=document.querySelector(".popup__input_type_name"),S=document.querySelector(".popup__input_type_description"),q=document.querySelector(".popup_type_new-card").querySelector(".popup_type_new-card .popup__content .popup__form"),g=document.querySelector(".popup__input_type_card-name"),k=document.querySelector(".popup__input_type_url"),L=document.querySelector(".profile__title"),E=document.querySelector(".profile__description"),C=document.querySelector(".profile__image"),j=document.querySelector(".profile__image-edit"),A=document.querySelector(".popup_type_edit-avatar"),x=document.querySelector(".popup_type_edit-avatar .popup__content .popup__form .popup__input_type_url"),T=document.querySelector(".popup_type_edit-avatar .popup__content .popup__form");function w(t){document.querySelector(".popup__button").textContent=t?"Сохранение...":"Сохранить"}function P(n,o,r,c){var a;n.classList.toggle("card__like-button_is-active"),!1==!n.classList.contains("card__like-button_is-active")?(console.log("лАЙКАЕМ!"),(a=c,fetch("".concat(e,"cards/likes/").concat(a._id),{method:"PUT",headers:{authorization:t,"Content-Type":"application/json"},body:JSON.stringify({likes:a.likes,_id:a._id})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).catch((function(t){console.log("Ошибка. Запрос не выполнен: ",t)}))).then((function(t){r.textContent=t.likes.length}))):function(n){return fetch("".concat(e,"cards/likes/").concat(n._id),{method:"DELETE",headers:{authorization:t},body:JSON.stringify({likes:n.likes,_id:n._id})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).catch((function(t){console.log("Ошибка. Запрос не выполнен: ",t)}))}(c).then((function(t){r.textContent=t.likes.length}))}function O(t,e){p.src=t.src,p.alt=t.alt,s.textContent=e,r(l)}Promise.all([fetch("".concat(e,"users/me"),{headers:{authorization:t}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).catch((function(t){console.log("Ошибка. Запрос не выполнен: ",t)})),fetch("".concat(e,"cards"),{headers:{authorization:t}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).catch((function(t){console.log("Ошибка. Запрос не выполнен: ",t)}))]).then((function(t){var e,n,r=(n=2,function(t){if(Array.isArray(t))return t}(e=t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var o,r,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=c.call(n)).done)&&(i.push(o.value),i.length!==e);u=!0);}catch(t){l=!0,r=t}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return i}}(e,n)||function(t,e){if(t){if("string"==typeof t)return u(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?u(t,e):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=r[0],a=r[1];L.textContent=c.name,E.textContent=c.about,C.setAttribute("style","background-image: url(".concat(c.avatar,")")),a.forEach((function(t){var e=o(t,O,P);_.append(e);var n=e.querySelector(".card__delete-button");"9ba15da7537acf3e06b7d4bc"!==t.owner._id&&n.classList.add("hidden")}))})),j.addEventListener("click",(function(){r(A)})),d.addEventListener("click",(function(){r(f),b.value=L.textContent,S.value=E.textContent})),m.addEventListener("click",(function(){r(y)})),v.forEach((function(t){t.addEventListener("click",(function(e){(e.target.classList.contains("popup")||e.target.classList.contains("popup__close"))&&c(t)}))})),h.addEventListener("submit",(function(n){n.preventDefault();var o,r={name:"",about:"",avatar:""};r.name=b.value,r.about=S.value,w(!0),(o=r,fetch("".concat(e,"users/me"),{method:"PATCH",headers:{authorization:t,"Content-Type":"application/json"},body:JSON.stringify({name:o.name,about:o.about})})).finally((function(){w(!1)})),L.textContent=b.value,E.textContent=S.value,c(document.querySelector(".popup_is-opened"))})),q.addEventListener("submit",(function(n){n.preventDefault();var r,a={name:"",link:""};a.name=g.value,a.link=k.value,w(!0),(r=a,fetch("".concat(e,"cards"),{method:"POST",headers:{authorization:t,"Content-Type":"application/json"},body:JSON.stringify({name:r.name,about:r.about,link:r.link})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).catch((function(t){console.log("Ошибка. Запрос не выполнен: ",t)}))).then((function(t){var e=o(t,O,P);_.prepend(e)})).finally((function(){w(!1)})),c(document.querySelector(".popup_is-opened")),g.value="",k.value=""})),T.addEventListener("submit",(function(n){n.preventDefault();var o,r={avatar:""};r.avatar=x.value,w(!0),(o=r,fetch("".concat(e,"users/me/avatar"),{method:"PATCH",headers:{authorization:t,"Content-Type":"application/json"},body:JSON.stringify({avatar:o.avatar})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).catch((function(t){console.log("Ошибка. Запрос не выполнен: ",t)}))).then((function(t){C.setAttribute("style","background-image: url(".concat(t.avatar,")"))})).finally((function(){w(!1)})),c(document.querySelector(".popup_is-opened"))})),Array.from(document.querySelectorAll(".popup__form")).forEach((function(t){t.addEventListener("submit",(function(t){t.preventDefault()})),function(t){var e=Array.from(t.querySelectorAll(".popup__input")),n=t.querySelector(".popup__button");i(e,n),e.forEach((function(o){o.addEventListener("input",(function(){!function(t,e){e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity(""),e.validity.valid?function(t,e){var n=t.querySelector(".".concat(e.id,"-error"));e.classList.remove("form__input_type_error"),n.classList.remove("form__input-error_active"),n.textContent=""}(t,e):function(t,e,n){var o=t.querySelector(".".concat(e.id,"-error"));e.classList.add("form__input_type_error"),o.textContent=n,o.classList.add("form__input-error_active")}(t,e,e.validationMessage)}(t,o),i(e,n)}))}))}(t)})),console.log("Hello, World!")})();
//# sourceMappingURL=main.js.map