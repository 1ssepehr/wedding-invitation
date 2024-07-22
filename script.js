window.addEventListener('load', function () {
    const envelope = document.querySelector('.envelope');
    const envelopeFlap = document.querySelector('.envelope-flap-container');

    // Step 1: Flip the envelope after 2 seconds
    setTimeout(function () {
        envelope.classList.add('flipped');
    }, 3000);

    // Step 2: Open the envelope flap after the flip is complete
    envelope.addEventListener('transitionend', function (e) {
        if (e.propertyName === 'transform' && envelope.classList.contains('flipped')) {
            setTimeout(function () {
                envelopeFlap.classList.add('open');

                // Step 3: Hide non-invitation images after the flap is open
                envelopeFlap.addEventListener('transitionend', function (e) {
                    if (e.propertyName === 'transform' && envelopeFlap.classList.contains('open')) {
                        setTimeout(fadeOutNonInvitationImages(), 500);
                    }
                }, { once: true });
            }, 500); // Small delay for better visual effect
        }
    });

    function fadeOutNonInvitationImages(duration = 1200) {
        const images = document.querySelectorAll('img:not([alt="Invitation"])');
        images.forEach(img => {
            img.style.transition = `opacity ${duration}ms ease-out`;
            img.style.opacity = '0';
        });

        // Remove the images from the layout after they've faded out
        setTimeout(() => {
            images.forEach(img => {
                img.style.display = 'none';
            });
        }, 1200);
        // remove shadow from envelope-container after the images are removed, with transition
        setTimeout(() => {
            document.querySelector('.envelope-container').style.transition = 'box-shadow 1s ease-out';
            document.querySelector('.envelope-container').style.boxShadow = 'none';
        }, 0);

        setTimeout(() => {
            const invitation = document.querySelector('img[alt="Invitation"]');
            invitation.classList.add('rotated');
        }, 1100);
    }
});