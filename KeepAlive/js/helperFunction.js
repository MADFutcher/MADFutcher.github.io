
////////////////////////////////
// Helper functions
////////////////////////////////

// Return: a set of approximately evenly spaced points along a cubic Bezier curve
//
// Attribution: Stackoverflow's @Blindman67
// Cite: http://stackoverflow.com/questions/36637211/drawing-a-curved-line-in-css-or-canvas-and-moving-circle-along-it/36827074#36827074
// As modified from the above citation
//
// ptCount: sample this many points at interval along the curve
// pxTolerance: approximate spacing allowed between points
// Ax,Ay,Bx,By,Cx,Cy,Dx,Dy: control points defining the curve
//
function plotCBez(ptCount, pxTolerance, Ax, Ay, Bx, By, Cx, Cy, Dx, Dy) {
    var deltaBAx = Bx - Ax;
    var deltaCBx = Cx - Bx;
    var deltaDCx = Dx - Cx;
    var deltaBAy = By - Ay;
    var deltaCBy = Cy - By;
    var deltaDCy = Dy - Cy;
    var ax, ay, bx, by;
    var lastX = -10000;
    var lastY = -10000;
    var pts = [{ x: Ax, y: Ay }];
    for (var i = 1; i < ptCount; i++) {
        var t = i / ptCount;
        ax = Ax + deltaBAx * t;
        bx = Bx + deltaCBx * t;
        cx = Cx + deltaDCx * t;
        ax += (bx - ax) * t;
        bx += (cx - bx) * t;
        //
        ay = Ay + deltaBAy * t;
        by = By + deltaCBy * t;
        cy = Cy + deltaDCy * t;
        ay += (by - ay) * t;
        by += (cy - by) * t;
        var x = ax + (bx - ax) * t;
        var y = ay + (by - ay) * t;
        var dx = x - lastX;
        var dy = y - lastY;
        if (dx * dx + dy * dy > pxTolerance) {
            pts.push({ x: Math.floor(x), y: Math.floor(y) });
            lastX = x;
            lastY = y;
        }
    }
    pts.push({ x: Dx, y: Dy });
    return pts;
}

// Return: an array of approximately evenly spaced points along a Quadratic curve
//
// Attribution: Stackoverflow's @Blindman67
// Cite: http://stackoverflow.com/questions/36637211/drawing-a-curved-line-in-css-or-canvas-and-moving-circle-along-it/36827074#36827074
// As modified from the above citation
//
// ptCount: sample this many points at interval along the curve
// pxTolerance: approximate spacing allowed between points
// Ax,Ay,Bx,By,Cx,Cy: control points defining the curve
//
function plotQBez(ptCount, pxTolerance, Ax, Ay, Bx, By, Cx, Cy) {
    var deltaBAx = Bx - Ax;
    var deltaCBx = Cx - Bx;
    var deltaBAy = By - Ay;
    var deltaCBy = Cy - By;
    var ax, ay;
    var lastX = -10000;
    var lastY = -10000;
    var pts = [{ x: Ax, y: Ay }];
    for (var i = 1; i < ptCount; i++) {
    var t = i / ptCount;
    ax = Ax + deltaBAx * t;
    ay = Ay + deltaBAy * t;
    var x = ax + (Bx + deltaCBx * t - ax) * t;
    var y = ay + (By + deltaCBy * t - ay) * t;
    var dx = x - lastX;
    var dy = y - lastY;
    if (dx * dx + dy * dy > pxTolerance) {
        pts.push({ x: x, y: y });
        lastX = x;
        lastY = y;
    }
    }
    pts.push({ x: Cx, y: Cy });
    return pts;
}

// GET POINT AT TOP OF QUADRATIC CURVE t=0.5

function getQuadraticXY(t, sx, sy, cp1x, cp1y, ex, ey) {
    return {
      x: (1-t) * (1-t) * sx + 2 * (1-t) * t * cp1x + t * t * ex,
      y: (1-t) * (1-t) * sy + 2 * (1-t) * t * cp1y + t * t * ey
    };
  }

// Return: an array of approximately evenly spaced points along a line
//
// pxTolerance: approximate spacing allowed between points
// Ax,Ay,Bx,By: end points defining the line
//
function plotLine(pxTolerance, Ax, Ay, Bx, By) {
    var dx = Bx - Ax;
    var dy = By - Ay;
    var ptCount = parseInt(Math.sqrt(dx * dx + dy * dy)) * 3;
    var lastX = -10000;
    var lastY = -10000;
    var pts = [{ x: Ax, y: Ay }];
    for (var i = 1; i <= ptCount; i++) {
    var t = i / ptCount;
    var x = Ax + dx * t;
    var y = Ay + dy * t;
    var dx1 = x - lastX;
    var dy1 = y - lastY;
    if (dx1 * dx1 + dy1 * dy1 > pxTolerance) {
        pts.push({ x: x, y: y });
        lastX = x;
        lastY = y;
    }
    }
    pts.push({ x: Bx, y: By });
    return pts;
}


function getLineEndPoint(pos, len, ang) {
    return {
        x: pos.x + len * Math.cos((ang * 180) / Math.PI),
        y: pos.y + len * Math.sin((ang * 180) / Math.PI)
    };
}