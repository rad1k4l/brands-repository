Object.defineProperty(navigator, "languages", {
    get: function() {
        return ["en-US", "en"];
    },
});


Object.defineProperty(navigator, 'plugins', {
    get: function() {

        return [1, 2, 3, 4, 5];
    },
});


const getParameter = WebGLRenderingContext.getParameter;
WebGLRenderingContext.prototype.getParameter = function(parameter) {
    //UNMASKED_VENDOR_WEBGL
    if (parameter === 37445) {
        return 'Intel Open Source Technology Center';
    }
    //UNMASKED_RENDERER_WEBGL
    if (parameter === 37446) {
        return 'Mesa DRI Intel(R) Ivybridge Mobile ';
    }

    return getParameter(parameter);
};


['height', 'width'].forEach(property => {
    const imageDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, property);
    Object.defineProperty(HTMLImageElement.prototype, property, {
        ...imageDescriptor,
        get: function() {
            if (this.complete && this.naturalHeight === 0) {
                return 20;
            }
            return imageDescriptor.get.apply(this);
        },
    });
});
