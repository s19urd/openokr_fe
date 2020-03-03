let _paq = window._paq
let trackEvent = (EventCatetory, EventAction, EventName) => {
    _paq && _paq.push([
        'trackEvent',
        EventCatetory,
        EventAction,
        EventName
    ])
}

export default trackEvent