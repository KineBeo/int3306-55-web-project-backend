'use strict';

const axios = require('axios');
const BASE_URL = 'http://localhost:8000';
const BASE_USER_URL = `${BASE_URL}/user`;
const BASE_AIRPORT_URL = `${BASE_URL}/airport`;
const BASE_FLIGHT_URL = `${BASE_URL}/flight`;
const BASE_TICKET_URL = `${BASE_URL}/ticket`;
const BASE_AIRPLANE_URL = `${BASE_URL}/airplane`;
const BASE_AUTH_URL = `${BASE_URL}/auth`;

// SEED DATA
const ADMIN = {
  fullname: 'Le Hoang Minh',
  phone_number: '0988668938',
  email: 'adminexample123@gmail.com',
  password_hash: 'StrongP@ssw0rd!',
  role: 'ADMIN',
  birthday: '1990-01-01',
  gender: 'MALE',
};

const DATA = {
  airports: [
    {
      code: "JFK",
      name: "John F. Kennedy International Airport",
      city: "New York",
      country: "United States",
    },
    {
      code: "LAX",
      name: "Los Angeles International Airport",
      city: "Los Angeles",
      country: "United States",
    },
  ],

  airplanes: [
    {
      model_name: 'Boeing 747',
      manufacturer: 'Boeing',
      serial_number: '12345',
      registration_number: 'N12345',
      capacity: 416,
      economy_seats: 324,
      business_seats: 60,
      first_class_seats: 32,
      status: 'ACTIVE',
      created_at: new Date(),
      updated_at: new Date(),
    }
  ],

  flights: [
    // Flight from JFK to LAX
    {
      departure_airport_id: -1,
      arrival_airport_id: -1,
      airplane_id: -1,
      flight_number: "AA100",
      base_price: '300',
      departure_time: new Date("2023-12-01T08:00:00Z"),
      arrival_time: new Date("2023-12-01T11:00:00Z"),
      duration: '12600', // in seconds (3.5 hours)
      delay_duration: '0'
    },

    // Flight from LAX to JFK
    {
      departure_airport_id: -1,
      arrival_airport_id: -1,
      airplane_id: -1,
      flight_number: "DL200",
      base_price: '350',
      departure_time: new Date("2023-12-02T09:00:00Z"),
      arrival_time: new Date("2023-12-02T12:30:00Z"),
      duration: '12600', // in seconds (3.5 hours)
      delay_duration: '600' // in seconds (10 minutes)
    },
  ],

  tickets: [
    {
      outbound_flight_id: -1,
      return_flight_id: -1,
      user_id: -1,
      booking_date: new Date("2023-11-30T23:59:59Z"),
      ticket_type: "ROUND_TRIP",
      booking_class: "BUSINESS",
      booking_seat_code: "B2-123-45",  // Updated to meet min length 5
      description: "Round trip business class ticket from LAX to JFK",  // Updated to meet min length 10
      total_passengers: 1,
      base_price: "700",  // Changed to string to match DTO
      booking_status: "CONFIRMED"
    }
  ]
}

// SEED LOGIC
let accessToken = '';

const registerAdmin = async () => {
  try {
    const response = await axios.post(`${BASE_AUTH_URL}/register`, ADMIN, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    });
    console.log('Admin registered successfully:', response.data);
  } catch (error) {
    if (error.response.data.message === 'Phone number is already in use') {
      console.log('Admin already registered.');
      return;
    }
    
    console.error('Error registering admin:', error.response.data);
  }
}

const loginAdmin = async () => {
  try {
    const response = await axios.post(`${BASE_AUTH_URL}/login`, {
      phone_number: ADMIN.phone_number,
      password: ADMIN.password_hash
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    });

    console.log('Admin logged in successfully:', response.data);
    accessToken = response.data.access_token;
    console.log('Access token:', accessToken);
  } catch (error) {
    console.error('Error logging in admin:', error.response.data);
  }
}

const deleteFlightData = async () => {
  try {
    // Get all flights
    const response = await axios.get(BASE_FLIGHT_URL, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const flights = response.data;
    console.log('Deleting flights:', flights);
    const deletePromises = flights.map(async (flight) => {
      try {
        await axios.delete(`${BASE_FLIGHT_URL}/${flight.id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': `Bearer ${accessToken}`
          }
        });
      } catch (error) {
        console.error('Error deleting flight:', error.response.data);
      }
    });

    await Promise.all(deletePromises);
    console.log('All flights deleted successfully.');
  } catch (error) {
    console.error('Error fetching flights:', error.response.data);
  }
}

const deleteAirportData = async () => {
  try {
    // Get all airports
    const response = await axios.get(BASE_AIRPORT_URL, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const airports = response.data;
    console.log('Deleting airports:', airports);
    const deletePromises = airports.map(async (airport) => {
      try {
        await axios.delete(`${BASE_AIRPORT_URL}/${airport.id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': `Bearer ${accessToken}`
          }
        });
      } catch (error) {
        console.error('Error deleting airport:', error.response.data);
      }
    });

    await Promise.all(deletePromises);
    console.log('All airports deleted successfully.');
  } catch (error) {
    console.error('Error fetching airports:', error.response.data);
  }
}

const deleteAirplaneData = async () => {
  try {
    // Get all airplanes
    const response = await axios.get(BASE_AIRPLANE_URL, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const airplanes = response.data;
    console.log('Deleting airplanes:', airplanes);
    const deletePromises = airplanes.map(async (airplane) => {
      try {
        await axios.delete(`${BASE_AIRPLANE_URL}/${airplane.id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': `Bearer ${accessToken}`
          }
        });
      } catch (error) {
        console.error('Error deleting airplane:', error.response.data);
      }
    });

    await Promise.all(deletePromises);
    console.log('All airplanes deleted successfully.');
  } catch (error) {
    console.error('Error fetching airplanes:', error.response.data);
  }
}

const deleteTicketData = async () => {
  try {
    // Get all tickets
    const response = await axios.get(BASE_TICKET_URL, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const tickets = response.data;
    console.log('Deleting tickets:', tickets);
    const deletePromises = tickets.map(async (ticket) => {
      try {
        await axios.delete(`${BASE_TICKET_URL}/${ticket.id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': `Bearer ${accessToken}`
          }
        });
      } catch (error) {
        console.error('Error deleting ticket:', error.response.data);
      }
    });

    await Promise.all(deletePromises);
    console.log('All tickets deleted successfully.');
  } catch (error) {
    const errorMessage = error.response.data.message;
    if (errorMessage === 'No ticket found') {
      console.log('No tickets to delete.');
    } else {
      console.error('Error fetching tickets:', error.response.data);
    }
  }
}

const createAirportData = async () => {
  try {
    const createPromises = DATA.airports.map(async (airport) => {
      try {
        await axios.post(BASE_AIRPORT_URL, airport, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': `Bearer ${accessToken}`
          }
        });
      } catch (error) {
        console.error('Error creating airport:', error.response.data);
      }
    });

    await Promise.all(createPromises);
    console.log('All airports created successfully.');
  } catch (error) {
    console.error('Error creating airports:', error.response.data);
  }
}

const createAirplaneData = async () => {
  try {
    const createPromises = DATA.airplanes.map(async (airplane) => {
      try {
        await axios.post(BASE_AIRPLANE_URL, airplane, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': `Bearer ${accessToken}`
          }
        });
      } catch (error) {
        console.error('Error creating airplane:', error.response.data);
      }
    });

    await Promise.all(createPromises);
    console.log('All airplanes created successfully.');
  } catch (error) {
    console.error('Error creating airplanes:', error.response.data);
  }
}

const createFlightData = async () => {
  // Update flight data with airport and airplane IDs
  const airportsResponse = await axios.get(BASE_AIRPORT_URL, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const airplanesResponse = await axios.get(BASE_AIRPLANE_URL, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const airportsData = airportsResponse.data;
  const airplanesData = airplanesResponse.data;

  DATA.flights.forEach((flight, index) => {
    flight.departure_airport_id = airportsData[index % airportsData.length].id;
    flight.arrival_airport_id = airportsData[(index + 1) % airportsData.length].id;
    flight.airplane_id = airplanesData[0].id;
  });

  try {
    const createPromises = DATA.flights.map(async (flight) => {
      try {
        await axios.post(BASE_FLIGHT_URL, flight, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': `Bearer ${accessToken}`
          }
        });
      } catch (error) {
        console.error('Error creating flight:', error.response.data);
      }
    });

    await Promise.all(createPromises);
    console.log('All flights created successfully.');
  } catch (error) {
    console.error('Error creating flights:', error.response.data);
  }
}

const createTicketData = async () => {
  // Update ticket data with flight IDs
  const flightsResponse = await axios.get(BASE_FLIGHT_URL, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const flightsData = flightsResponse.data;

  const adminResponse = await axios.get(`${BASE_USER_URL}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const adminData = adminResponse.data.find(user => user.phone_number === ADMIN.phone_number);

  DATA.tickets.forEach((ticket, index) => {
    ticket.outbound_flight_id = flightsData[index % flightsData.length].id;
    ticket.return_flight_id = flightsData[(index + 1) % flightsData.length].id;
    ticket.user_id = adminData.id;
  });

  try {
    const createPromises = DATA.tickets.map(async (ticket) => {
      try {
        await axios.post(BASE_TICKET_URL, ticket, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': `Bearer ${accessToken}`
          }
        });
      } catch (error) {
        console.error('Error creating ticket:', error.response.data);
      }
    });

    await Promise.all(createPromises);
    console.log('All tickets created successfully.');
  } catch (error) {
    console.error('Error creating tickets:', error.response.data);
  }
}


// ENTRY POINT
const seed = async () => {
  await registerAdmin(); 
  await loginAdmin();
  await deleteFlightData();
  await deleteAirportData();
  await deleteAirplaneData();
  await deleteTicketData();
  await createAirportData();
  await createAirplaneData();
  await createFlightData();
  await createTicketData();
}

seed();