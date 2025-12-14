(async () => {
  const truckLocation = document.getElementById('truckLocation')
  const menuItems = document.getElementById('menuItems')

  const { pathname } = window.location
  const [, firstSegment, id] = pathname.split('/') // "" | "event" | ...

  if (pathname === '/' || pathname === '') {

    const menuRes = await fetch('/api/v1/menu')
    const menuData = await menuRes.json()

    menuItems.innerHTML = menuData
      .map(item => `
        <div class="menu-item">
          <h4>
          <a href="/menu/${item.number}">#${item.number}.
          ${item.name}
          </a>
          </h4>
          <img src="${item.image}" width="150" />
          <p>${item.description}</p>
          <strong>$${item.price}</strong>
        </div>
      `)
      .join('')
    
    const eventRes = await fetch('/api/v1/events')
    const eventData = await eventRes.json()

    truckLocation.innerHTML = eventData
      .map(event => `
        <div class="event-item">
          <h4>
            <a href="/event/${event._id}">
              ${event.name}
            </a>
          </h4>
          <p>${event.date}</p>
        </div>
      `)
      .join('')
  }

  if (firstSegment === 'event' && id) {
    const res = await fetch(`/api/v1/events/${id}`)
    const event = await res.json()

    truckLocation.innerHTML = `
      <h2>${event.name}</h2>
      <p><strong>Location:</strong> ${event.location}</p>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Time:</strong> ${event.time}</p>
    `
  }


  //Tom
  if(firstSegment === 'menu' && id) {
    const res = await fetch(`/api/v1/menu/${id}`)
    const item = await res.json()

    document.getElementById('locations').innerText = `Menu Item #${item.number}`
    document.getElementById('menuLabel').innerText = `${item.name}`

    menuItems.innerHTML = `    
    <img src="${item.image}" width="300" class="menu-item-image"/>
    <p>${item.description}</p>
    <p>$${item.price}</p>
    `
  }
})()
