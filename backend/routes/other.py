from flask import render_template, Blueprint

other_bp = Blueprint('other', __name__)


@other_bp.route('/about')
def about_page():
    return render_template('pages/about.html')
