document.addEventListener('DOMContentLoaded', function() {
    // Log page view
    console.log(`${new Date().toISOString()}, view, page_loaded`);
    
    // Navigation active state
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function getCurrentSection() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        return current;
    }
    
    function updateNavigation() {
        const currentSection = getCurrentSection();
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    // Smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
            
            // Log click event
            console.log(`${new Date().toISOString()}, click, nav-link:${this.textContent}`);
        });
    });
    
    // Project card tilt effect
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = (x / rect.width - 0.5) * 5;
            const yPercent = (y / rect.height - 0.5) * 5;
            
            card.style.transform = `perspective(1000px) rotateY(${xPercent}deg) rotateX(${-yPercent}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });
    });
    
    // Text analyzer functionality
    const textInput = document.getElementById('text-input');
    const analyzeButton = document.getElementById('analyze-button');
    const resultsGrid = document.getElementById('analysis-results');
    
    analyzeButton.addEventListener('click', function() {
        // Validate input
        if (!textInput.value.trim()) {
            alert('Please enter some text to analyze');
            return;
        }
        
        const text = textInput.value;
        
        // Word lists
        const pronouns = [
            'i', 'me', 'my', 'mine', 'myself', 
            'you', 'your', 'yours', 'yourself', 
            'he', 'him', 'his', 'himself', 
            'she', 'her', 'hers', 'herself',
            'it', 'its', 'itself',
            'we', 'us', 'our', 'ours', 'ourselves',
            'they', 'them', 'their', 'theirs', 'themselves',
            'this', 'that', 'these', 'those',
            'who', 'whom', 'whose', 'which', 'what'
        ];
        
        const prepositions = [
            'about', 'above', 'across', 'after', 'against', 'along', 'amid', 'among',
            'around', 'at', 'before', 'behind', 'below', 'beneath', 'beside', 'between',
            'beyond', 'by', 'concerning', 'considering', 'despite', 'down', 'during',
            'except', 'for', 'from', 'in', 'inside', 'into', 'like', 'near', 'of',
            'off', 'on', 'onto', 'out', 'outside', 'over', 'past', 'regarding',
            'round', 'since', 'through', 'throughout', 'to', 'toward', 'under',
            'underneath', 'until', 'unto', 'up', 'upon', 'with', 'within', 'without'
        ];
        
        const articles = ['a', 'an', 'the'];
        
        // Analysis calculations
        const letters = (text.match(/[a-zA-Z]/g) || []).length;
        const words = text.trim().split(/\s+/).length;
        const spaces = (text.match(/\s/g) || []).length;
        const newlines = (text.match(/\n/g) || []).length;
        const specialSymbols = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;
        
        // Tokenize text for word analysis
        const tokenizedText = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
        
        // Count specific word types
        const pronounCount = tokenizedText.filter(word => pronouns.includes(word)).length;
        const prepositionCount = tokenizedText.filter(word => prepositions.includes(word)).length;
        const articleCount = tokenizedText.filter(word => articles.includes(word)).length;
        
        // Update result boxes
        document.getElementById('letters-count').textContent = `Letters: ${letters}`;
        document.getElementById('words-count').textContent = `Words: ${words}`;
        document.getElementById('spaces-count').textContent = `Spaces: ${spaces}`;
        document.getElementById('newlines-count').textContent = `Newlines: ${newlines}`;
        document.getElementById('special-symbols-count').textContent = `Special Symbols: ${specialSymbols}`;
        document.getElementById('pronouns-count').textContent = `Pronouns: ${pronounCount}`;
        document.getElementById('prepositions-count').textContent = `Prepositions: ${prepositionCount}`;
        document.getElementById('articles-count').textContent = `Articles: ${articleCount}`;
        
        // Show results with animation
        resultsGrid.classList.add('active');
        
        // Log analyze event
        console.log(`${new Date().toISOString()}, analyze, text-analyzer:${words} words analyzed`);
    });
    
    // Add scroll event listener for navigation updates
    window.addEventListener('scroll', updateNavigation);
    
    // Trigger initial navigation update
    updateNavigation();
});
