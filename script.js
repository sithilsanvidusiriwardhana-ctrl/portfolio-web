// Virtual Database - Array-based storage
const database = {
  entries: [],
  
  add: function(name, email, message) {
    const entry = {
      id: Date.now(),
      name: name,
      email: email,
      message: message,
      timestamp: new Date().toLocaleString()
    };
    this.entries.push(entry);
    this.save();
    return entry;
  },
  
  getAll: function() {
    return this.entries;
  },
  
  delete: function(id) {
    this.entries = this.entries.filter(e => e.id !== id);
    this.save();
  },
  
  clear: function() {
    this.entries = [];
    this.save();
  },
  
  save: function() {
    localStorage.setItem('contactDatabase', JSON.stringify(this.entries));
  },
  
  load: function() {
    const data = localStorage.getItem('contactDatabase');
    this.entries = data ? JSON.parse(data) : [];
  }
};

document.addEventListener('DOMContentLoaded',()=>{
  const navToggle=document.querySelector('.nav-toggle');
  const nav=document.querySelector('.site-nav');
  const year=document.getElementById('year');
  year.textContent=new Date().getFullYear();

  if(navToggle){
    navToggle.addEventListener('click',()=>nav.classList.toggle('open'))
  }

  // Load database from localStorage
  database.load();
  
  // Display initial data
  displayData();

  const form=document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit',(e)=>{
      e.preventDefault();
      const name = form.name.value;
      const email = form.email.value;
      const message = form.message.value;
      
      // Add to virtual database
      database.add(name, email, message);
      
      // Update display
      displayData();
      
      // Show confirmation and reset
      alert('Thank you! Your message has been saved.');
      form.reset();
    })
  }
  
  // Clear data button
  const clearBtn = document.getElementById('clearDataBtn');
  if(clearBtn) {
    clearBtn.addEventListener('click', ()=>{
      if(confirm('Are you sure you want to delete all entries?')) {
        database.clear();
        displayData();
      }
    })
  }
});

// Function to display data
function displayData() {
  const dataDisplay = document.getElementById('dataDisplay');
  const entryCount = document.getElementById('entryCount');
  const entries = database.getAll();
  
  entryCount.textContent = `Entries: ${entries.length}`;
  
  if(entries.length === 0) {
    dataDisplay.innerHTML = '<p class="empty-message">No submissions yet</p>';
    return;
  }
  
  dataDisplay.innerHTML = entries.map(entry => `
    <div class="entry">
      <div class="entry-header">
        <div>
          <div class="entry-name">${escapeHtml(entry.name)}</div>
          <div class="entry-email">${escapeHtml(entry.email)}</div>
          <small style="color: var(--muted);">${entry.timestamp}</small>
        </div>
        <button class="entry-delete" onclick="deleteEntry(${entry.id})">Delete</button>
      </div>
      <div class="entry-message">${escapeHtml(entry.message)}</div>
    </div>
  `).join('');
}

// Function to delete an entry
function deleteEntry(id) {
  database.delete(id);
  displayData();
}

// Function to safely escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
