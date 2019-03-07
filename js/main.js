function short2full(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    return hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });
}

function hex2RGB1(hex) {
    hex = short2full(hex)
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function hex2RGB2(hex) {
    hex = short2full(hex)
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return result ? {
        r: r,
        g: g,
        b: b
    } : null;
}

document.querySelectorAll('ul li').forEach(li=>{
    let span1 = li.querySelector('span');
    span1.setAttribute('data-color', span1.innerText);
    let color_hex = span1.innerText;
    li.style.backgroundColor = color_hex;

    let a = document.createElement('a');
    let span2 = document.createElement('span');
    let color_rgb = hex2RGB1(color_hex);
    let r = color_rgb.r;
    let g = color_rgb.g;
    let b = color_rgb.b;
    span2.setAttribute('data-color', `rgb(${r},${g},${b})`);
    span2.innerText = `rgb(${r},${g},${b})`;
    a.appendChild(span2);

    li.appendChild(a);

    // click to copy color code
    let copy_f = function() {
        navigator.permissions.query({name: "clipboard-write"}).then(result=>{
            if (result.state == "granted" || result.state == "prompt") {
                /* write to the clipboard now */
                navigator.clipboard.writeText(this.getAttribute('data-color'));

                // show hint, and disappear
                let hint = document.createElement('span');
                hint.innerText = '√ 已复制';
                hint.style.float = 'right';
                this.appendChild(hint);

                // auto disappear
                setTimeout(()=>{
                    hint.style.transition = "opacity 2s linear 0s";
                    hint.style.opacity = 0;

                    setTimeout(()=>{
                        hint.parentNode.removeChild(hint);
                    }, 3000);

                }, 1000);
            }  // end if
        }
        );
    };
    span1.addEventListener('click', copy_f);
    span2.addEventListener('click', copy_f);
});
