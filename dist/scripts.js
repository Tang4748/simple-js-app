let pokemonRepository=function(){let e=[],t=document.querySelector(".modal-dialog");function n(e){let t=document.createElement("div");t.classList.add("text-center");let n=document.createElement("div");n.classList.add("spinner-border"),n.setAttribute("role","status");let i=document.createElement("span");i.classList.add("sr-only"),i.innerText="Loading...",n.appendChild(i),t.appendChild(n),e.appendChild(t)}function i(e){e.removeChild(e.lastChild)}function o(t){"object"==typeof t&&"name"in t?e.push(t):console.log("pokemon is not correct")}function a(){return e}let l=document.querySelector("#search-form");function r(e){d(e).then(function(){let t=document.querySelector(".modal-title"),n=document.querySelector(".modal-body");t.innerHTML="",n.innerHTML="";document.querySelector(".modal-title").innerText=e.name.charAt(0).toUpperCase()+e.name.slice(1);let i=document.createElement("img");i.classList.add("modal-img"),i.src=e.frontImageUrl;let o=document.createElement("img");o.classList.add("modal-img"),o.src=e.backImageUrl;let a=document.createElement("div");a.classList.add("modal-text");let l=document.createElement("p");l.innerText="Height: "+e.height/10+" m";let r=document.createElement("p");r.innerText="Types: "+e.types;let d=document.createElement("p");d.innerText="Abilities: "+e.abilities,n.appendChild(i),n.appendChild(a),a.appendChild(l),a.appendChild(r),a.appendChild(d)})}function d(e){let t=document.querySelector(".modal-body");return n(t),fetch(e.detailsUrl).then(function(e){return e.json()}).then(function(n){i(t),e.frontImageUrl=n.sprites.front_default,e.backImageUrl=n.sprites.back_default,e.height=n.height;let o=[];n.types.forEach(function(e){o.push(e.type.name)}),e.types=o.join(", ");let a=[];n.abilities.forEach(function(e){a.push(e.ability.name)}),e.abilities=a.join(", ")}).catch(function(e){i(t),console.error(e)})}return l.addEventListener("keyup",()=>{var e;document.querySelector(".list-group1").innerHTML="",e=l.value.toLowerCase(),pokemonRepository.getAll().forEach(t=>{t.name.indexOf(e)>-1&&pokemonRepository.addListItem(t)})}),{add:o,getAll:a,showLoadingSpinner:n,hideLoadingSpinner:i,addListItem:function e(t){let n=document.querySelector(".pokemon-list"),i=document.createElement("li"),o=document.createElement("button");o.setAttribute("data-toggle","modal"),o.setAttribute("data-target","#pokemonModal"),o.innerText=t.name,o.classList.add("pokemon-button"),i.appendChild(o),n.appendChild(i),o.addEventListener("click",function(e){r(t)})},showDetails:r,loadList:function e(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(e){return e.json()}).then(function(e){e.results.forEach(function(e){o({name:e.name,detailsUrl:e.url})})}).catch(function(e){console.error(e)})},loadDetails:d,hideModal:function e(){t.classList.add("hidden")},showModal:function e(t){let n=$(".modal-title"),i=$(".modal-body");n.empty(),i.empty();let o=$('<img class="modal-img" style="width:50%">');o.attr("src",t.imageUrlFront);$('<img class="modal-img" style="width:50%">').attr("src",t.imageUrlBack);let a=$("<p>height : "+t.height+"</p>"),l=$("<p>weight : "+t.weight+"</p>"),r=$("<p>types : "+t.types+"</p>");n.append(t.name),i.append(o),i.append(a),i.append(l),i.append(r)}}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})});