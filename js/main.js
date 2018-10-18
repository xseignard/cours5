var menu = document.querySelector('.menu');
var burger = document.querySelector('.burger');

// au clic sur le burger, permuter la classe .visible sur le menu
// l'enlever si elle est présente, l'ajouter sinon
burger.addEventListener('click', function() {
	menu.classList.toggle('visible');
});

// gestion du scroll du menu
var projects = document.querySelector('.projects');
var project = document.querySelectorAll('.project');
// largeur du conteneur des projets (en pixels)
var projectsWidth = projects.clientWidth;
// son milieu
var center = projectsWidth / 2;
// Pour scroller horizontalement nous allons additionner les quantités de "tours"
// de molette de souris (ou de "scroll" sur touch pad) et stocker cette quantité
// dans la variable suivante.
var i = 0;
menu.addEventListener('wheel', function(event) {
	// ATTENTION! C'est plutôt compliqué par ici!!!!
	// PRENDRE UN PAPIER ET UN CRAYON POUR ESSAYER DE VOIR CE QU'IL SE PASSE!!
	// ne s'occuper des tours de roues que lorsque le menu est visible
	if (menu.classList.contains('visible')) {
		// si le menu est visible, j'empêche le scroll car sinon
		// on verra le site scroller sous le menu
		// enlver/commenter cet event listener pour le constater
		// https://developer.mozilla.org/fr/docs/Web/API/Event/preventDefault
		// si le menu n'est pas visible, tout se passe comme d'habitude
		event.preventDefault();
		// Math.abs est une fonction qui retourne la valeur absolue d'un nombre
		// en effet selon le sens des "tours" de molette, la quantité peut être
		// positive ou négative.
		// Si la quantité de tours de roue déjà comptée plus la nouvelle quantité
		// détectée (en valeur absolue) par l'event listener dépasse
		// le centre plus la moitié d'une largeur d'image
		// cela veut dire que nous sommes à l'une ou l'autre des extrémités du
		// conteneur .projects
		if (Math.abs(i + event.deltaY) <= center + 150) i += event.deltaY;
		// La quantité de tours de molette est désormais mise à jour
		// Appliquons un translate identique à tous les .projet afin
		// de créer un scroll horizontal
		project.forEach(function(p) {
			// nous récupérons le left de chaque .projet
			var left = p.getBoundingClientRect().left;
			if (Math.abs(left - center) < 180) {
				// si la distance entre le centre de .projects et le left récupéré
				// est inférieure à 180 pixels (un peu plus de la moitié de la largeur d'un .project)
				// cela veut dire que ce .project est autour du centre de .projects
				// nous modifions donc le translateX ET le scale
				// modification directe du style, sans passer par une classe CSS
				p.style.transform = 'translateX(' + i + 'px) scale(1.1)';
				p.style.opacity = 1;
			} else {
				// si l'élément n'est pas autour du centre de .projects
				// nous ne modifions que le translateX
				// modification directe du style, sans passer par une classe CSS
				p.style.transform = 'translateX(' + i + 'px)';
				p.style.opacity = 0.3;
			}
		});
	}
});

// window.addEventListener('scroll', function(event) {
// 	if (menu.classList.contains('visible')) {
// 		event.preventDefault();
// 	} else {
// 		console.log('tst');
// 	}
// });
