function injectNoteIcon() {
    if (document.getElementById('noteFlowIcon')) return;
  
    const svgIcon = document.createElement('div');
    svgIcon.id = 'noteFlowIcon';
    svgIcon.style.position = 'fixed';
    svgIcon.style.bottom = '20px';
    svgIcon.style.right = '20px';
    svgIcon.style.width = '50px';
    svgIcon.style.height = '50px';
    svgIcon.style.cursor = 'pointer';
    svgIcon.style.zIndex = '1000';
    svgIcon.style.border = '2px solid #ff9800';
    svgIcon.style.borderRadius = '50%';
    
    svgIcon.innerHTML = `
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http:
        <path d="M10 10H45V45L10 55V10Z" fill="#F0F4C3" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M15 15H40" stroke="#757575" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M15 22H40" stroke="#757575" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M15 29H25" stroke="#757575" stroke-width="1.5" stroke-linecap="round"/>
        <g transform="translate(40, 20) rotate(-30)">
          <rect x="0" y="-1.5" width="14" height="3" rx="1.5" fill="#FF9800"/>
          <path d="M1 0L15 0" stroke="#F57C00" stroke-width="2" stroke-linecap="round"/>
          <path d="M3 -1L3 5 8 10" stroke="#F57C00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      </svg>
    `;
  
    const popup = document.createElement('div');
    popup.id = 'notePopup';
    popup.style.position = 'fixed';
    popup.style.bottom = '80px';
    popup.style.right = '20px';
    popup.style.width = '200px';
    popup.style.padding = '10px';
    popup.style.backgroundColor = '#fff';
    popup.style.border = '1px solid #ccc';
    popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    popup.style.display = 'none';
    popup.style.zIndex = '1001';
  
    
    const urlParts = window.location.pathname.split('/');
    const objectType = urlParts[4];  
    const recordId = urlParts[5];    
    
    
    const noteKey = `note-${objectType}-${recordId}`;
    const existingNote = localStorage.getItem(noteKey);
  
    
    if (existingNote) {
      svgIcon.style.border = '2px solid #ff9800'; 
    }
  
    
    popup.innerHTML = `
      <button id="viewNoteButton" style="width: 100%; margin-bottom: 5px;">View Notes</button>
      <button id="createNoteButton" style="width: 100%;">Create Note</button>
      <textarea id="noteInput" rows="3" style="width: 100%; display: none;"></textarea>
      <button id="saveNoteButton" style="margin-top: 5px; width: 100%; display: none;">Save Note</button>
      <div id="noteDisplay" style="display: none; margin-top: 10px;"></div>
    `;
  
    document.body.appendChild(svgIcon);
    document.body.appendChild(popup);
  
    
    svgIcon.addEventListener('click', () => {
      popup.style.display = popup.style.display === 'none' ? 'block' : 'none';
    });
  
    
    document.getElementById('viewNoteButton').addEventListener('click', () => {
      const noteDisplay = document.getElementById('noteDisplay');
      const noteInput = document.getElementById('noteInput');
      const saveButton = document.getElementById('saveNoteButton');
  
      if (existingNote) {
        noteDisplay.textContent = existingNote;
        noteDisplay.style.display = 'block';
        noteInput.style.display = 'none';
        saveButton.style.display = 'none';
      } else {
        noteDisplay.textContent = 'No notes found for this record.';
        noteDisplay.style.display = 'block';
      }
    });
  
    
    document.getElementById('createNoteButton').addEventListener('click', () => {
      const noteDisplay = document.getElementById('noteDisplay');
      noteDisplay.style.display = 'none';
      document.getElementById('noteInput').style.display = 'block';
      document.getElementById('saveNoteButton').style.display = 'block';
    });
  
    
    document.getElementById('saveNoteButton').addEventListener('click', () => {
      const note = document.getElementById('noteInput').value;
  
      if (note) {
        localStorage.setItem(noteKey, note);
        alert('Note saved!');
        
        
        document.getElementById('noteInput').value = '';
        document.getElementById('noteInput').style.display = 'none';
        document.getElementById('saveNoteButton').style.display = 'none';
  
        
        svgIcon.style.border = '2px solid #ff9800';
      } else {
        alert('Please enter a note.');
      }
    });
  }
  
  window.addEventListener('load', injectNoteIcon);
  