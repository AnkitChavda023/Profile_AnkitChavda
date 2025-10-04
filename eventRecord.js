(function() {
    
    const eventLog = [];
    

    function getObjectType(element) {
        const tag = element.tagName.toLowerCase();
        const type = element.type?.toLowerCase();
        
        if (tag === 'button') return 'button';
        if (tag === 'a') return 'link';
        if (tag === 'img') return 'image';
        if (tag === 'select') return 'dropdown';
        if (tag === 'textarea') return 'textarea';
        if (tag === 'input') {
            if (type === 'text') return 'text_input';
            if (type === 'email') return 'email_input';
            if (type === 'checkbox') return 'checkbox';
            if (type === 'radio') return 'radio_button';
            if (type === 'submit') return 'submit_button';
            return 'input_' + type;
        }
        if (tag === 'p') return 'paragraph';
        if (tag === 'span') return 'span_text';
        if (tag === 'div') return 'div_container';
        if (tag === 'h1' || tag === 'h2' || tag === 'h3') return 'heading';
        if (tag === 'canvas') return 'canvas';
        if (tag === 'svg') return 'svg_graphic';
        
        return tag;
    }
    
    function logEvent(eventType, element) {
        const eventData = {
            Timestamp_of_click_view: new Date().toLocaleString(),
            type_of_event: eventType,
            event_object: getObjectType(element),
            tag_name: element.tagName.toLowerCase(),
            element_id: element.id || 'N/A',
            element_class: element.className || 'N/A',
            element_text: (element.textContent || element.value || '').substring(0, 50)
        };
        
        eventLog.push(eventData);
        
        console.log(eventData);
    }
    

    document.addEventListener('click', function(e) {
        logEvent('click', e.target);
    }, true);
    
    window.addEventListener('load', function() {
        logEvent('view', document.body);
    });

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    logEvent('view', entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        setTimeout(function() {
            document.querySelectorAll('img, video, canvas, .card, section').forEach(function(el) {
                observer.observe(el);
            });
        }, 1000);
    }
    
    console.log('✅ Event Tracker Initialized - Check console for events');
})();