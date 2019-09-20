"use strict";

var Prometeo = (function () {

    let currentlyDragging = null;
    let cloneDragging = null;
    const items = [].slice.call(document.querySelectorAll('.item'), 0);
    const blueprint = document.querySelector('.blueprint');
    var marked = null;

    let settings = {
        'edit': true,
        'move': false,
    };

    let init = function () {
        itemLoad();
        blox();
        tools();
    }

    let refresh = function () {
        deinit();
        init();
    }

    let deinit = function () {
        removeToolbars();
    }

    var removeToolbars = function () {
        let toolbars = document.querySelectorAll('.toolbar');
        toolbars.forEach(toolbar => {
            toolbar.remove(true);
        });
    }


    var itemLoad = function () {
        var items = document.querySelectorAll('.menu .item');

        items.forEach(item => {
            item.setAttribute('draggable', true);
            item.ondragstart = function (ev) {
                ev.dataTransfer.effectAllowed = 'move';
                ev.dataTransfer.setData('text/html', this.innerHTML)
                currentlyDragging = ev.target;
                cloneDragging = currentlyDragging.cloneNode(true);
            }
        });
    }

    var tools = function () {
        let items = document.querySelectorAll('.blueprint .item');
        let toolbar = document.createElement('div');

        items.forEach(item => {
            item.appendChild(toolbar);
        });

        toolbar.classList.add('toolbar');

        createTool(toolbar, 'Delete', 'tool',
            'fa-trash',
            function (e) {
                e.target.parentNode.parentNode.remove();
            });

    }



    var blox = function () {
 
        items.forEach(item => {
            blueprint.ondragenter = blueprint.ondragover = function (ev) {
                ev.preventDefault();
                item.classList.add('hovering');
            };

            item.ondragleave = function () {
                item.classList.remove('hovering');
            };

            item.ondrop = function (ev) {

                // cloneDragging.onclick = function (e) {
                //     e.target.remove();
                // }

                blueprint.appendChild(cloneDragging);
                item.classList.remove('hovering');
                currentlyDragging = null;
                cloneDragging = null;
                marked = null;

                tools();
            };

        });
    }


    function createTool(drawer, title, className, iconClass, eventHandlers) {
        var tool = document.createElement('button');
        tool.innerHTML = '<i class="fa ' + iconClass + '"></i>';
        tool.classList = className;
        drawer.appendChild(tool);

        if (typeof eventHandlers == 'function') {
            tool.onclick = eventHandlers;
        }

        // if (typeof eventHandlers == 'object') {
        //     // $.each(eventHandlers, function (name, func) {
        //     //     tool.on(name, func);
        //     // });
        // }
    }


    return {
        init: init
    }
})();


Prometeo.init();