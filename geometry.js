/*****
*
*   Point2D
*
*****/

/*****
*
*   constructor
*
*****/
function Point2D(x, y) {
    if (arguments.length > 0) {
        this.x = x;
        this.y = y;
    }
}

/*****
*
*   Intersection
*
*****/

/*****
*
*   constructor
*
*****/
function Intersection(status) {
    if (arguments.length > 0) {
        this.init(status);
    }
}

/*****
*
*   init
*
*****/
Intersection.prototype.init = function (status) {
    this.status = status;
    this.points = new Array();
};

/*****
*
*   intersectLineLine
*
*****/
Intersection.intersectLineLine = function (a1, a2, b1, b2) {
    var result;

    var ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
    var ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
    var u_b = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);

    if (u_b != 0) {
        var ua = ua_t / u_b;
        var ub = ub_t / u_b;

        if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
            result = new Intersection("Intersection");
            result.points.push(
						new Point2D(
							a1.x + ua * (a2.x - a1.x),
							a1.y + ua * (a2.y - a1.y)
						)
					);
        } else {
            result = new Intersection("No Intersection");
        }
    } else {
        if (ua_t == 0 || ub_t == 0) {
            result = new Intersection("Coincident");
        } else {
            result = new Intersection("Parallel");
        }
    }

    return result;
};

/*****
*
*   intersectLinePolygon
*
*****/
Intersection.intersectLinePolygon = function (a1, a2, points) {
    var result = new Intersection("No Intersection");
    var length = points.length;

    for (var i = 0; i < length; i++) {
        var b1 = points[i];
        var b2 = points[(i + 1) % length];
        var inter = Intersection.intersectLineLine(a1, a2, b1, b2);

        result.appendPoints(inter.points);
    }

    if (result.points.length > 0) result.status = "Intersection";

    return result;
};

function Clone(x) {
    for (p in x)
        this[p] = (typeof (x[p]) == 'object') ? new Clone(x[p]) : x[p];
}