window.addEventListener('load', () => {
    const envelope = document.querySelector('.envelope');
    const envelopeFlap = document.querySelector('.envelope-flap-container');

    // Flip the envelope after 2 seconds
    setTimeout(() => envelope.classList.add('flipped'), 2000);

    // Handle transitions and open the envelope flap
    envelope.addEventListener('transitionend', (e) => {
        if (e.propertyName === 'transform' && envelope.classList.contains('flipped')) {
            setTimeout(() => openEnvelopeFlap(), 500);
        }
    });

    const openEnvelopeFlap = () => {
        envelopeFlap.classList.add('open');

        // Fade out non-invitation images after the flap is open
        envelopeFlap.addEventListener('transitionend', (e) => {
            if (e.propertyName === 'transform' && envelopeFlap.classList.contains('open')) {
                fadeOutNonInvitationImages();
            }
        }, { once: true });
    };

    const fadeOutNonInvitationImages = () => {
        const images = document.querySelectorAll('img:not([alt="Invitation"])');
        images.forEach(img => {
            img.style.transition = 'opacity 1200ms ease-out';
            img.style.opacity = '0';
        });

        setTimeout(() => images.forEach(img => img.style.display = 'none'), 1200);
        removeShadowFromEnvelopeContainer();
        setTimeout(() => {
            rotateInvitationImage();
        }, 1500);

    };

    const removeShadowFromEnvelopeContainer = () => {
        const envelopeContainer = document.querySelector('.envelope-container');
        envelopeContainer.style.transition = 'box-shadow 1s ease-out';
        envelopeContainer.style.boxShadow = 'none';
    };

    const rotateInvitationImage = () => {
        const invitation = document.querySelector('img[alt="Invitation"]');
        invitation.style.transition = 'transform 1s';
        invitation.style.transform = 'rotate(90deg)';
    };
});
