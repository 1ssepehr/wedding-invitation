window.addEventListener('load', () => {
    const envelope = document.querySelector('.envelope');
    const envelopeFlap = document.querySelector('.envelope-flap-container');

    // Flip the envelope after 2 seconds
    setTimeout(() => envelope.classList.add('flipped'), 3000);

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
                applyZIndexToImages();
                moveOutEnvelope();
            }
        }, { once: true });
    };

    const moveOutEnvelope = () => {
        const images = document.querySelectorAll('img:not([class="invitation"])');
        images.forEach(img => {
            img.style.transition = 'transform 3s ease-in, box-shadow 1s ease-out';
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
        const invitation = document.querySelector('.invitation');
        invitation.style.transformOrigin = 'center center';
        invitation.style.transition = 'transform 1.5s, top 1.5s, box-shadow 1.5s';
        invitation.style.transform = 'rotate(90deg) scale(1.55)';
        invitation.style.top = '-43%';
        invitation.style.boxShadow = '12px 0 20px 0 rgba(0, 0, 0, 0.4)';


        // Start the glitter effect after the rotation is complete
        setTimeout(startGlitterEffect, 1500);
    };

    const startGlitterEffect = () => {
        const invitation = document.querySelector('.invitation');
        const rect = invitation.getBoundingClientRect();
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.left = `${rect.left}px`;
        container.style.top = `${rect.top}px`;
        container.style.width = `${rect.width}px`;
        container.style.height = `${rect.height}px`;
        container.style.pointerEvents = 'none';
        document.body.appendChild(container);

        const createSparkle = () => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.position = 'absolute';
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.width = `${Math.random() * 15 + 15}px`;
            sparkle.style.height = sparkle.style.width;
            // sparkle.style.backgroundColor = getRandomColor();
            sparkle.style.backgroundImage = `radial-gradient(circle closest-side, rgba(255, 255, 255, 0.6), ${getRandomColor()})`;
            sparkle.style.borderRadius = '50%';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.opacity = '0';
            sparkle.style.animation = 'sparkle 2.5s ease-in-out infinite';
            container.appendChild(sparkle);

            setTimeout(() => {
                sparkle.remove();
            }, 2500);
        };

        function getRandomColor() {
            const colors = [
                "rgb(255, 215, 0)",
                "rgb(255, 105, 180)",
                "rgb(0, 206, 209)",
                "rgb(255, 160, 122)",
                "rgb(152, 251, 152)",
                "rgb(135, 206, 250)",
                "rgb(221, 160, 221)",
                "rgb(240, 230, 140)",
                "rgb(255, 127, 80)",
                "rgb(127, 255, 212)",
                "rgb(255, 218, 185)",
                "rgb(176, 224, 230)"
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        // Create sparkles at intervals
        const interval = setInterval(() => {
            createSparkle();
            createSparkle();
            createSparkle();
        }, 300);

        // Stop creating sparkles after 10 seconds
        setTimeout(() => {
            clearInterval(interval);
        }, 20000);
    };
});
