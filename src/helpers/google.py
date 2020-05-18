from helpers.date import format_datetime


def get_google_calendar_link(event):
    text = event.get('summary')
    date_format = "%Y%m%d" if event.get('allDay') else "%Y%m%dT%H%M%SZ"
    start_date = format_datetime(event.get('start'), date_format)
    end_date = format_datetime(event.get('end'), date_format)
    details = event.get('description')
    location = event.get('location')
    return f"http://www.google.com/calendar/event?action=TEMPLATE&text={text}&dates={start_date}/{end_date}&details={details}&location={location}&trp=false&sprop=&sprop=name:"
