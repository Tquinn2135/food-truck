(async () => {
     const truckLocation = document.querySelector('truck-location')
     const menuItems = document.querySelector('.menu-items')

     const { pathname} = window.location
     const [, searchType, id] = pathname.split('/')

     if (searchType === 'trucks' && id) {
          const menuRes = await fetch(`/api/v1/menu`)
          const menuData = await menuRes.json()
     }

     menuItems.innerHTML = menuData
     .map(item => `
     <div class="menu-item">
     <h4>${item.name}</h4>
     <img src="${item.imageUrl}" width="150 />
     <p>${item.description}</p>
     <strong>$${item.price}</strong>
     </div>
     `)

     .join('')

     const eventRed = await fetch('api/v1/events')
     const eventData = await eventRed.json()
     truckLocation.innerHTML = eventData

     .map(event => `
     <div class="event-item">
     <h4>
     <a href="/event/${event.id}">
     ${event.name}
     </a>
     </h4>
     <p>${event.date}</p>
     </div>
     `)
     .join('')
     
     if (searchType === 'events' && id) {
          const res = await fetch(`/api/v1/events/${id}`)
          const event = await res.json()

          truckLocation.innerHTMN =`
          <h2>${event.name}</h2>
          <p><strong>Location:</strong> ${event.location}</p>
          <p><strong>Date:</strong> ${event.date}</p>
          <p><strong>Time:</strong> ${event.time}</p>
     
          `

     }
})()