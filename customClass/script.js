document.addEventListener('DOMContentLoaded', (event) => {
    const button = document.getElementById('animateButton');
    button.addEventListener('click', applyAnimation);
});

function applyAnimation() {
    createCSSSelector('.square', animationClass);
}

function createCSSSelector(selector, styleObj) {
    if (!document.styleSheets) return;
    if (document.getElementsByTagName('head').length === 0) return;

    var styleSheet, mediaType;

    if (document.styleSheets.length > 0) {
        for (var i = 0, l = document.styleSheets.length; i < l; i++) {
            if (document.styleSheets[i].disabled) continue;
            var media = document.styleSheets[i].media;
            mediaType = typeof media;

            if (mediaType === 'string') {
                if (media === '' || media.indexOf('screen') !== -1) {
                    styleSheet = document.styleSheets[i];
                }
            } else if (mediaType === 'object') {
                if (media.mediaText === '' || media.mediaText.indexOf('screen') !== -1) {
                    styleSheet = document.styleSheets[i];
                }
            }

            if (typeof styleSheet !== 'undefined') break;
        }
    }

    if (typeof styleSheet === 'undefined') {
        var styleSheetElement = document.createElement('style');
        styleSheetElement.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(styleSheetElement);

        for (i = 0; i < document.styleSheets.length; i++) {
            if (document.styleSheets[i].disabled) continue;
            styleSheet = document.styleSheets[i];
        }

        mediaType = typeof styleSheet.media;
    }

    function camelCaseToDash(myStr) {
        return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    }

    function createKeyframesRule(name, keyframes) {
        var keyframesStr = '@keyframes ' + name + ' {';
        for (var key in keyframes) {
            if (keyframes.hasOwnProperty(key)) {
                keyframesStr += key + ' {';
                for (var property in keyframes[key]) {
                    if (keyframes[key].hasOwnProperty(property)) {
                        keyframesStr += camelCaseToDash(property) + ':' + keyframes[key][property] + ';';
                    }
                }
                keyframesStr += '}';
            }
        }
        keyframesStr += '}';
        return keyframesStr;
    }

    var style = '';
    var keyframes = null;
    var animationProps = {};

    for (var property in styleObj) {
        if (styleObj.hasOwnProperty(property)) {
            if (property === 'keyframes') {
                keyframes = styleObj[property];
            } else if (property.startsWith('animation')) {
                animationProps[camelCaseToDash(property)] = styleObj[property];
            } else {
                style += camelCaseToDash(property) + ':' + styleObj[property] + ';';
            }
        }
    }

    if (keyframes) {
        var keyframeName = Object.keys(keyframes)[0];
        style += 'animation-name:' + keyframeName + ';';
        for (var animProp in animationProps) {
            if (animationProps.hasOwnProperty(animProp)) {
                style += animProp + ':' + animationProps[animProp] + ';';
            }
        }
    }

    if (mediaType === 'string') {
        for (var i = 0, l = styleSheet.cssRules.length; i < l; i++) {
            if (styleSheet.cssRules[i].selectorText && styleSheet.cssRules[i].selectorText.toLowerCase() === selector.toLowerCase()) {
                styleSheet.cssRules[i].style.cssText = style;
                return;
            }
        }
        styleSheet.insertRule(selector + '{' + style + '}', styleSheet.cssRules.length);
        if (keyframes) {
            var keyframeRule = createKeyframesRule(keyframeName, keyframes[keyframeName]);
            styleSheet.insertRule(keyframeRule, styleSheet.cssRules.length);
        }
    } else if (mediaType === 'object') {
        var styleSheetLength = (styleSheet.cssRules) ? styleSheet.cssRules.length : 0;
        for (var i = 0; i < styleSheetLength; i++) {
            if (styleSheet.cssRules[i].selectorText && styleSheet.cssRules[i].selectorText.toLowerCase() === selector.toLowerCase()) {
                styleSheet.cssRules[i].style.cssText = style;
                return;
            }
        }
        styleSheet.insertRule(selector + '{' + style + '}', styleSheetLength);
        if (keyframes) {
            var keyframeRule = createKeyframesRule(keyframeName, keyframes[keyframeName]);
            styleSheet.insertRule(keyframeRule, styleSheetLength + 1);
        }
    }
}

const squareStyle = {
    backgroundColor: "red",
    width: '100px',
    height: '100px',
    marginTop: '100px',
    position: 'absolute',
    top: '120vh',
}

const containerStyle = {
    backgroundColor: "yellow",
    height: '50px',
    overflowY: 'scroll',
    position: 'relative'
}

const stretcherStyle = {
    backgroundColor: "blue",
    height: '2500px',
    overflowX: 'none',
}

const animationClass = {
    // backgroundColor: "red",
    // width: '100px',
    // height: '100px',
    marginTop: '100px',
    position: 'absolute',
    top: '120vh',
    animationName: 'moveSquare',
    animationDuration: '10ms',
    animationDirection: 'alternate',
    animationTimeline: 'view()',
    right: '0%',
    left: '100%',
    keyframes: {
        moveSquare: {
            'from': {
                right: '0%',
                left: '100%',
            },
            'to': {
                right: '100%',
                left: '0%',
            }
        }
    }
}

createCSSSelector('.stretcher', stretcherStyle);
createCSSSelector('.container', animationClass);
// createCSSSelector('.square', squareStyle);
