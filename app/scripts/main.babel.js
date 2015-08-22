/* jshint esnext: true */

console.log('\'Allo \'Allo!');

import h from 'virtual-dom/h';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';
//import createElement from 'virtual-dom/create-element';
import parser from 'html2hscript';
import virtualize from 'vdom-virtualize';

let root = document.querySelector('div.hero-unit');
console.log(root.innerHTML);

parser(root.innerHTML, (err, hscript) => console.log(hscript));

let vhero = virtualize(root);
console.dir(vhero);

let save = JSON.stringify(vhero);
console.log(save);

function render(data) {
  return h('div', {
    'className': 'hero-unit',
     'dataset': {},
     'style': {},
     'attributes': {'class': 'hero-unit'}
  }, [
  h('h1', {
    'dataset': {},
    'style': {},
    'attributes': {}
  }, [ data.header ]),
  h('p', {
    'dataset': {},
    'style': {},
    'attributes': {}
  },[ data.content ]),
  h('ul', {
    'dataset': {},
    'style': {},
    'attributes': {}
  }, data.list.map( text => h('li', {
      'dataset': {},
      'style': {},
      'attributes': {}
    },[ text ]))
  )]);
}

setTimeout(() => {

  let newhero = render(data);
  console.dir(newhero);

  let patches = diff(vhero, newhero);
  console.dir(patches);

  root = patch(root, patches);
  console.log(root.innerHTML);
 
  vhero = newhero;
  
  let sa = JSON.stringify(vhero);
  console.log(sa);
  console.log(sa === save);

  update();

}, 5000);


let data = {
  header: '\'Allo, \'Allo!',
  content: 'You now have',
  list: ['HTML5 Boilerplate']
};

function update() {
 
  data.list = data.list.concat('HTML5 Boilerplate' + (new Date())).slice(-10);

  let newhero = render(data);
  patch(root, diff(vhero, newhero));
  vhero = newhero;

  setTimeout(update, 500);
}

