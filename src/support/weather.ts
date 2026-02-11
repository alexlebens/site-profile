interface DayForecast {
  date: string;
  temp: number;
  code: number;
  label: string;
  icon: string;
  dayName: string;
}

interface WeatherResult {
  forecastDays: DayForecast[];
  error: string | null;
}

const getWeatherInfo = (code: number) => {
  if (code === 0) return { label: 'Clear', icon: '01d' };
  if (code >= 1 && code <= 3) return { label: 'Partly Cloudy', icon: '02d' };
  if (code === 45 || code === 48) return { label: 'Foggy', icon: '50d' };
  if (code >= 51 && code <= 55) return { label: 'Drizzle', icon: '09d' };
  if (code >= 61 && code <= 65) return { label: 'Rainy', icon: '10d' };
  if (code === 66 || code === 67) return { label: 'Freezing Rain', icon: '13d' };
  if (code >= 71 && code <= 75) return { label: 'Snowy', icon: '13d' };
  if (code === 77) return { label: 'Snow Grains', icon: '13d' };
  if (code >= 80 && code <= 82) return { label: 'Showers', icon: '09d' };
  if (code === 85 || code === 86) return { label: 'Snow Showers', icon: '13d' };
  if (code >= 95 && code <= 99) return { label: 'Stormy', icon: '11d' };

  return { label: 'Unknown', icon: '03d' };
};

const getDayName = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' });
};

async function getFiveDayForecast(latitude: string, longitude: string): Promise<WeatherResult> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max&timezone=auto&temperature_unit=fahrenheit`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather service unavailable");
    
    const data = await response.json();
    
    const forecastDays = data.daily.time.map((date: string, index: number): DayForecast => {
      const code = data.daily.weather_code[index];
      const info = getWeatherInfo(code);
      
      return {
        date,
        temp: Math.round(data.daily.temperature_2m_max[index]),
        code,
        label: info.label,
        icon: info.icon,
        dayName: getDayName(date)
      };
    }).slice(0, 5);

    return { forecastDays, error: null };
  } catch (e: unknown) {
    return { 
      forecastDays: [], 
      error: e instanceof Error ? e.message : "An unexpected error occurred" 
    };
  }
}

export { getFiveDayForecast };
