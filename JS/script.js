document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => initializeTabDuplication(), 100);
    const patientData = {
        'tab-2': { name: 'Ryan Braswell', image: './assets/Images/WEBP/Rayan1.webp', gender: 'Male', dob: '08/15/1985', age: '38 Yrs' },
        'tab-3': { name: 'Jinny Johnson', image: './assets/Images/png/image.png', gender: 'Female', dob: '06/26/1986', age: '35 Yrs' },
        'tab-4': { name: 'Ryan Braswell', image: './assets/Images/WEBP/Rayan2.webp', gender: 'Male', dob: '08/15/1985', age: '38 Yrs' },
        'tab-5': { name: 'Ryan Braswell', image: './assets/Images/WEBP/Rayan3.webp', gender: 'Male', dob: '08/15/1985', age: '38 Yrs' },
        'tab-6': { name: 'Ryan Braswell', image: './assets/Images/png/Rayan3.png', gender: 'Male', dob: '08/15/1985', age: '38 Yrs' } };
    function initializeTabDuplication() {
        const sourcePane = document.getElementById('pane-1');
        const targetPanes = ['pane-2', 'pane-3', 'pane-4', 'pane-5', 'pane-6'];   
        if (!sourcePane) return console.error('Source pane not found'); 
        targetPanes.forEach((paneId, index) => {
            const targetPane = document.getElementById(paneId);
            if (!targetPane) return;
            targetPane.innerHTML = sourcePane.innerHTML;
            targetPane.classList.remove('show', 'active');
            const paneNumber = index + 2;
            updatePatientCard(targetPane, patientData[`tab-${paneNumber}`]);
            updateAllIds(targetPane, paneNumber);
            initializeBootstrapTabs(targetPane, paneNumber);
        });
        console.log('All secondary tabs are now working on all primary tabs!');
    }
    function updatePatientCard(container, patientInfo) {
        if (!patientInfo) return;
        
        const patientImage = container.querySelector('img[alt="Patient"]');
        if (patientImage) {
            patientImage.src = patientInfo.image;
           patientImage.alt = patientInfo.name;
        }
        const patientNameElement = container.querySelector('h6.mb-0.me-2');
        if (patientNameElement?.textContent.trim() === 'Patient') {
            patientNameElement.textContent = patientInfo.name;
        }
        const patientInfoElements = container.querySelectorAll('small.text-muted');
        if (patientInfoElements[0]?.textContent.includes('|')) {
            patientInfoElements[0].innerHTML = `${patientInfo.dob} | ${patientInfo.age} | ${patientInfo.gender}`;
        }
    }
    function updateAllIds(container, paneNumber) {
        container.querySelectorAll('a[data-bs-toggle="tab"]').forEach(link => {
            const href = link.getAttribute('href');
            const target = link.getAttribute('data-bs-target');
            if (href) link.setAttribute('href', `${href}-${paneNumber}`);
            if (target) link.setAttribute('data-bs-target', `${target}-${paneNumber}`);
        });
        container.querySelectorAll('.tab-pane[id*="-tab-pane"]').forEach(pane => {
            pane.id = `${pane.id}-${paneNumber}`;
        });
                container.querySelectorAll('[id]').forEach(element => {
            if (element.id && !element.id.includes(`-${paneNumber}`) && 
                !element.id.startsWith('pane-') && element.id !== 'pane-1') {
                element.id = `${element.id}-${paneNumber}`;
            }
        });
    }
    function initializeBootstrapTabs(container, paneNumber) {
        const tabTriggers = container.querySelectorAll('a[data-bs-toggle="tab"]');
        
        tabTriggers.forEach(trigger => {
            new bootstrap.Tab(trigger);
            
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                container.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('show', 'active'));
                container.querySelectorAll('a[data-bs-toggle="tab"]').forEach(link => link.classList.remove('active'));
                const targetId = this.getAttribute('data-bs-target') || this.getAttribute('href');
                const targetPane = targetId ? container.querySelector(targetId) : null;
                if (targetPane) targetPane.classList.add('show', 'active');
                this.classList.add('active');
            });
        });
        const firstTab = container.querySelector('a[data-bs-toggle="tab"]');
        const firstPane = container.querySelector('.tab-pane');
        
        if (firstTab && firstPane) {
            container.querySelectorAll('a[data-bs-toggle="tab"]').forEach(link => link.classList.remove('active'));
            container.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('show', 'active'));
            firstTab.classList.add('active');
                firstPane.classList.add('show', 'active');
            }
        }});