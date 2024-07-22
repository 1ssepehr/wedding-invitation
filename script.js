window.addEventListener('load', () => {
    const envelope = document.querySelector('.envelope');
    const envelopeFlap = document.querySelector('.envelope-flap-container');

    // Flip the envelope after 2 seconds
    setTimeout(() => envelope.classList.add('flipped'), 2000);

    // Handle transitions and open the envelope flap
    envelope.addEventListener('transitionend', (e) => {
        if (e.propertyName === 'transform' && envelope.classList.contains('flipped')) {
            setTimeout(() => openEnvelopeFlap(), 200);
        }
    });

    const openEnvelopeFlap = () => {
        envelopeFlap.classList.add('open');

        // Fade out non-invitation images after the flap is open
        envelopeFlap.addEventListener('transitionend', (e) => {
            if (e.propertyName === 'transform' && envelopeFlap.classList.contains('open')) {
                applyZIndexToImages();
                moveOutEnvelope();
            }
        }, { once: true });
    };

    const moveOutEnvelope = () => {
        const images = document.querySelectorAll('img:not([class="invitation"])');
        images.forEach(img => {
            img.style.transition = 'transform 2s ease-in, box-shadow 1s ease-out';
            img.style.transform = 'translateY(250%)';
        });

        removeShadowFromEnvelopeContainer();
        setTimeout(() => {
            rotateInvitationImage();
        }, 2500);

    };

    const applyZIndexToImages = () => {
        const throat = document.querySelector('img[class="throat"]');
        const invitation = document.querySelector('img[class="invitation"]');
        const envbody = document.querySelector('img[class="env-body"]');
        throat.style.zIndex = '1';
        invitation.style.zIndex = '2';
        envbody.style.zIndex = '3';
    }

    const removeShadowFromEnvelopeContainer = () => {
        const envelopeContainer = document.querySelector('.envelope-container');
        envelopeContainer.style.transition = 'box-shadow 1s ease-out';
        envelopeContainer.style.boxShadow = 'none';
    };

    const rotateInvitationImage = () => {
        const invitation = document.querySelector('img.invitation');
        invitation.style.transformOrigin = 'center center';
        invitation.style.transition = 'transform 1.5s, top 1.5s';
        invitation.style.transform = 'rotate(90deg) scale(1.5)';
        invitation.style.top = '-30%';
    };

    const zoomIntoInvitation = () => {
        const invitation = document.querySelector('img.invitation');
        invitation.style.transition = 'transform 2s';
        invitation.style.transform = 'scale(1.5)';
    }
});
