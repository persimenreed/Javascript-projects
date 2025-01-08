"use strict";

function TSprite(aSheet, aSpriteInfo, aPos, aIndex=0) {
    const sheet = aSheet;
    const si = aSpriteInfo;
    const pos = aPos;
    let spIndex = aIndex;
    if(si.gap == undefined){
        si.gap = 0;
    }

    this.draw = function () {
        const spFrame = Math.floor(spIndex);
        const sx = si.x + ((si.x + si.w + si.gap) * spFrame);
        ctx.drawImage(imgSheet, sx, si.y, si.w, si.h, pos.x, pos.y, si.w, si.h);
        spIndex += si.speed;
        if (spIndex >= si.count) {
            spIndex = 0;
        }
    }
    this.setIndex = function(aIndex){
        spIndex = aIndex;
    }
}
