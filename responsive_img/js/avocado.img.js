/*  Avocado - Responsive Images
 *  Copyright(c) 2015 Jakub Kwasek <jakub.kwasek@gmail.com>
 *  MIT Licensed
 *  Simple script providing responsive images functionality in one
 *  tag with all configs located in data- attributes
 */

var avocado_imgSettings = {
    "class": "js-avocado-img",
    "retinaPostfix": "_2x"
};

var avocado_imgData = {
    "breakPoints": [],
    "imagesName": "",
    "imagesExt": "",
    "imagesFolder": "",
    "browserWidth": 0,
    "imageVariant": ""
};

var avocado_imgCtrl = (function(){

    var handleMarkup = function(el){
        var breakPoints = avocado_imgData.breakPoints,
            breakPointToRender = 0;

        for (var i = 0; i < breakPoints.length; i++){
            if(breakPoints[i] <= avocado_imgData.browserWidth){
                breakPointToRender = breakPoints[i];
            }
            breakPointToRender = breakPointToRender === 0 ? breakPoints[0] : breakPointToRender;
        }

        var imgElement = document.createElement("img"),
            imgAtt = document.createAttribute("src");
            imgAtt.value = avocado_imgData.imagesFolder
                         + avocado_imgData.imagesName
                         + "_" + breakPointToRender
                         + avocado_imgData.imageVariant
                         + avocado_imgData.imagesExt;
            imgElement.setAttributeNode(imgAtt);
        el.innerHTML = '';
        el.appendChild(imgElement);
    };

    var getImagesData = function(el){
        var imagesName = el.getAttribute("data-images-name") || "test";
        avocado_imgData.imagesName = imagesName;
    };

    var getImagesFolder = function(el){
        var imagesFolder = el.getAttribute("data-images-folder")+"/" || "img/";
        avocado_imgData.imagesFolder = imagesFolder;
    };

    var getImagesExtData = function(el){
        var imagesExt = "." + el.getAttribute("data-images-ext") || ".png";
        avocado_imgData.imagesExt = imagesExt;
    };

    var getBreakPointsData = function(el){
        var breakPoints = el.getAttribute("data-break-points") || 0;
        avocado_imgData.breakPoints = JSON.parse("[" + breakPoints + "]");
        handleBreakPointsDataSorting();
    };

    var getBrowserWidth = function(){
        avocado_imgData.browserWidth = window.innerWidth;
    };

    var handleBreakPointsDataSorting = function(){
        var elements = avocado_imgData.breakPoints;
            elements.sort(function(a, b){return a-b});
        avocado_imgData.breakPoints = elements;
    }

    var handleElements = function(){
        var el = document.getElementsByClassName(avocado_imgSettings.class);
        for (var i = 0; i < el.length; i++){
            getBreakPointsData(el[i]);
            getImagesData(el[i]);
            getImagesExtData(el[i]);
            getImagesFolder(el[i]);
            getBrowserWidth();
            handleMarkup(el[i]);
        }
    };

    var handleRetina = function(){
        var isRetina = ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) || (window.devicePixelRatio && window.devicePixelRatio > 1.3));
            avocado_imgData.imageVariant = isRetina ? avocado_imgSettings.retinaPostfix : "";
    };

    var bindElements = function(){
        if(window.addEventListener){
            window.addEventListener("resize", function(){
                handleElements();
            });
        }else if(window.attachEvent){
            window.attachEvent('onresize', function(){
                handleElements();
            });
        }
    };

    return{
        init: function(){
            handleRetina();
            handleElements();
            bindElements();
            // TODO:
            // Add debug handler
            // Try catch everything that is possible
            // Add Jasmine
        }
    }

})();

avocado_imgCtrl.init();
