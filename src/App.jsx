import React, { useState, useEffect } from 'react';
import { Palette, TrendingDown, Zap, Menu, X, ChevronRight, LogOut } from 'lucide-react';

const ArtFlowApp = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [anxietyLevel, setAnxietyLevel] = useState(5);
  const [sessions, setSessions] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(600);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [authError, setAuthError] = useState('');

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('artflowUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setAnxietyLevel(userData.currentAnxiety || 5);
      setSessions(userData.sessions || []);
    }
    setLoading(false);
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      const userData = {
        email: user.email,
        id: user.id,
        currentAnxiety: anxietyLevel,
        sessions: sessions,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem('artflowUser', JSON.stringify(userData));
    }
  }, [user, anxietyLevel, sessions]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (timerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeRemaining]);

  // Handle signup
  const handleSignUp = (e) => {
    e.preventDefault();
    setAuthError('');

    if (email.length < 5 || !email.includes('@')) {
      setAuthError('Please enter a valid email');
      return;
    }
    if (password.length < 6) {
      setAuthError('Password must be at least 6 characters');
      return;
    }

    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('artflowUsers') || '[]');
    if (existingUsers.find(u => u.email === email)) {
      setAuthError('Email already registered');
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email: email,
      password: password, // In production, this would be hashed!
      createdAt: new Date().toISOString()
    };

    existingUsers.push(newUser);
    localStorage.setItem('artflowUsers', JSON.stringify(existingUsers));

    setUser({
      email: email,
      id: newUser.id
    });

    setEmail('');
    setPassword('');
    setIsSignUp(false);
  };

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError('');

    const existingUsers = JSON.parse(localStorage.getItem('artflowUsers') || '[]');
    const foundUser = existingUsers.find(u => u.email === email && u.password === password);

    if (!foundUser) {
      setAuthError('Invalid email or password');
      return;
    }

    setUser({
      email: foundUser.email,
      id: foundUser.id
    });

    setEmail('');
    setPassword('');
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    setSessions([]);
    setAnxietyLevel(5);
    localStorage.removeItem('artflowUser');
    setCurrentPage('home');
  };

  // Save session
  const saveSession = (activity) => {
    const newSession = {
      id: Date.now(),
      activity: activity.title,
      anxiety: anxietyLevel,
      timestamp: new Date().toISOString(),
      duration: 600 - timeRemaining,
      mood: 'completed'
    };

    const updatedSessions = [...sessions, newSession];
    setSessions(updatedSessions);
  };

  const handleAnxietyChange = (level) => {
    setAnxietyLevel(level);
  };

  const handleActivityComplete = () => {
    saveSession(selectedActivity);
    setCurrentPage('home');
    setTimerActive(false);
    setTimeRemaining(600);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white text-2xl">Loading ArtFlow...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-800 rounded-3xl p-8 shadow-xl">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Palette size={40} className="text-blue-400" />
            <h1 className="text-3xl font-bold text-white">ArtFlow</h1>
          </div>

          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>

          <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-xl border border-slate-600 focus:border-blue-400 focus:outline-none"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-xl border border-slate-600 focus:border-blue-400 focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>

            {authError && (
              <div className="bg-red-500/20 border border-red-400 text-red-300 px-4 py-3 rounded-xl text-sm">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition"
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setAuthError('');
            }}
            className="w-full mt-4 text-slate-400 hover:text-slate-300 text-sm"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>

          <div className="mt-6 p-4 bg-slate-700/50 rounded-xl border border-slate-600">
            <p className="text-xs text-slate-400 text-center">
              For testing, use any email and password. Your data will be saved locally.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const activities = [
    {
      id: 1,
      title: 'Anxiety Color Map',
      module: 'Foundation',
      duration: '10 min',
      description: 'Map your anxiety feelings to colors',
      emoji: '🎨',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 2,
      title: '5-Senses Drawing',
      module: 'Grounding',
      duration: '15 min',
      description: 'Ground yourself in the present moment',
      emoji: '👁️',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      title: 'Mandala Patterns',
      module: 'Grounding',
      duration: '20 min',
      description: 'Meditative repetitive art creation',
      emoji: '🔵',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 4,
      title: 'Emotion Spectrum',
      module: 'Emotion Regulation',
      duration: '15 min',
      description: 'Express your emotional range visually',
      emoji: '🌈',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 5,
      title: 'Worry Monster Transform',
      module: 'Cognitive Reframing',
      duration: '20 min',
      description: 'Turn anxiety into something manageable',
      emoji: '👹',
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 6,
      title: 'Quick Sketching',
      module: 'Stress Relief',
      duration: '5 min',
      description: 'Fast & free art for urgent anxiety',
      emoji: '✏️',
      color: 'from-yellow-500 to-orange-500'
    },
  ];

  const ActivityCard = ({ activity, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full bg-gradient-to-br ${activity.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer text-left`}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-4xl">{activity.emoji}</span>
        <span className="text-xs bg-white bg-opacity-30 px-3 py-1 rounded-full">{activity.duration}</span>
      </div>
      <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
      <p className="text-sm opacity-90 mb-3">{activity.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold opacity-75">{activity.module}</span>
        <ChevronRight size={20} />
      </div>
    </button>
  );

  const HomePage = () => (
    <div className="space-y-8 pb-8">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 text-white shadow-xl">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-4xl font-bold">Welcome Back</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 hover:bg-slate-700 rounded-lg transition"
          >
            <LogOut size={20} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
        <p className="text-slate-300 mb-2 text-sm">{user?.email}</p>
        <p className="text-slate-300 mb-6">How are you feeling right now?</p>
        
        <div className="bg-white bg-opacity-10 backdrop-blur rounded-2xl p-6 mb-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold">Anxiety Level</span>
            <span className="text-3xl font-bold text-cyan-400">{anxietyLevel}/10</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={anxietyLevel}
            onChange={(e) => handleAnxietyChange(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <div className="flex justify-between text-xs text-slate-300 mt-2">
            <span>Calm</span>
            <span>Overwhelming</span>
          </div>
        </div>

        {anxietyLevel > 7 && (
          <div className="bg-red-500 bg-opacity-20 border border-red-400 rounded-xl p-4">
            <p className="text-sm">💡 Try a quick activity right now. Even 5 minutes can help.</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-2xl p-4 text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-300">{sessions.length}</div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Sessions</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-2xl p-4 text-center">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-300">
            {sessions.length > 0 ? Math.round((sessions.reduce((a, b) => a + (b.anxiety || 0), 0) / sessions.length)) : 0}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Avg Anxiety</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/30 rounded-2xl p-4 text-center">
          <div className="text-3xl font-bold text-green-600 dark:text-green-300">
            {sessions.length > 0 ? Math.round(sessions.reduce((a, b) => a + (b.duration || 0), 0) / 60) : 0}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Min Total</p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Zap size={24} /> Pick an Activity
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activities.map(activity => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onClick={() => {
                setSelectedActivity(activity);
                setCurrentPage('activity');
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const ActivityPage = () => (
    <div className="space-y-6 pb-8">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setCurrentPage('home')}
          className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold">{selectedActivity?.title}</h2>
      </div>

      <div className={`bg-gradient-to-br ${selectedActivity?.color} rounded-3xl p-8 text-white text-center shadow-xl`}>
        <div className="text-6xl mb-4">{selectedActivity?.emoji}</div>
        <h3 className="text-3xl font-bold mb-2">{selectedActivity?.title}</h3>
        <p className="text-white/90">{selectedActivity?.description}</p>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 text-center">
        <div className="text-6xl font-bold text-slate-800 dark:text-white mb-4 font-mono">
          {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, '0')}
        </div>
        <div className="flex gap-3 justify-center mb-4">
          <button
            onClick={() => setTimeRemaining(300)}
            className={`px-4 py-2 rounded-xl font-semibold ${timeRemaining === 300 ? 'bg-blue-500 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}
          >
            5 min
          </button>
          <button
            onClick={() => setTimeRemaining(600)}
            className={`px-4 py-2 rounded-xl font-semibold ${timeRemaining === 600 ? 'bg-blue-500 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}
          >
            10 min
          </button>
          <button
            onClick={() => setTimeRemaining(1200)}
            className={`px-4 py-2 rounded-xl font-semibold ${timeRemaining === 1200 ? 'bg-blue-500 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}
          >
            20 min
          </button>
        </div>
        <button
          onClick={() => setTimerActive(!timerActive)}
          className={`w-full py-3 rounded-2xl font-bold text-lg transition-all ${
            timerActive
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {timerActive ? 'Pause' : 'Start Activity'}
        </button>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6">
        <h4 className="font-bold mb-3 text-lg">How to Get Started:</h4>
        <div className="space-y-2 text-sm">
          <p className="flex gap-3">
            <span className="font-bold text-blue-600">1</span>
            <span>Gather art supplies (paper, pencils, markers—anything you have)</span>
          </p>
          <p className="flex gap-3">
            <span className="font-bold text-blue-600">2</span>
            <span>Set your timer above</span>
          </p>
          <p className="flex gap-3">
            <span className="font-bold text-blue-600">3</span>
            <span>There's no "right" way—let your feelings guide the art</span>
          </p>
          <p className="flex gap-3">
            <span className="font-bold text-blue-600">4</span>
            <span>When done, reflect on how you feel</span>
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-6">
        <h4 className="font-bold mb-3">Reflection:</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold mb-2">How do you feel now?</label>
            <div className="flex gap-2">
              {['😢', '😕', '😐', '🙂', '😊'].map((emoji, i) => (
                <button
                  key={i}
                  className="text-4xl hover:scale-125 transition transform cursor-pointer"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleActivityComplete}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-xl transition"
          >
            Finish & Save
          </button>
        </div>
      </div>
    </div>
  );

  const TrackingPage = () => {
    const recentSessions = [...sessions].reverse().slice(0, 5);
    const avgAnxiety = sessions.length > 0 ? Math.round(sessions.reduce((a, b) => a + (b.anxiety || 0), 0) / sessions.length) : 0;
    const anxietyTrend = sessions.slice(-7).map(s => s.anxiety);

    return (
      <div className="space-y-6 pb-8">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <TrendingDown size={24} /> Your Progress
        </h2>

        <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-6">
          <h3 className="font-bold mb-4">Anxiety Trend (Last 7 Days)</h3>
          <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-2xl flex items-end justify-around p-4">
            {anxietyTrend.length > 0 ? anxietyTrend.map((val, i) => (
              <div
                key={i}
                className="w-6 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t"
                style={{ height: `${(val / 10) * 100}%` }}
                title={`Day: ${val}/10`}
              />
            )) : (
              <div className="text-slate-500">No data yet. Complete activities to see trends!</div>
            )}
          </div>
          <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            <p>📊 <strong>Average Anxiety: {avgAnxiety}/10</strong></p>
            <p className="mt-1">Total Sessions: {sessions.length}</p>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-3">Recent Sessions</h3>
          <div className="space-y-2">
            {recentSessions.length > 0 ? recentSessions.map(session => (
              <div key={session.id} className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{session.activity}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Anxiety: {session.anxiety}/10 • {Math.round(session.duration / 60)} mins
                  </p>
                </div>
                <div className="text-right text-sm text-slate-500">
                  {new Date(session.timestamp).toLocaleDateString()}
                </div>
              </div>
            )) : (
              <div className="text-slate-500 text-center py-8">No sessions yet. Start an activity!</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 dark:text-white">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Palette size={32} className="text-blue-600 dark:text-blue-400" />
            <span className="text-2xl font-bold">ArtFlow</span>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
            <nav className="max-w-4xl mx-auto px-4 py-3 space-y-2">
              {[
                { id: 'home', label: 'Home', icon: Palette },
                { id: 'tracking', label: 'Progress', icon: TrendingDown },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-lg transition flex items-center gap-2 ${
                    currentPage === item.id
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <item.icon size={20} />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'activity' && <ActivityPage />}
        {currentPage === 'tracking' && <TrackingPage />}
      </main>

      <nav className="hidden md:flex fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-800 shadow-xl rounded-full px-8 py-4 gap-6 border border-slate-200 dark:border-slate-700">
        {[
          { id: 'home', label: 'Home', icon: Palette },
          { id: 'tracking', label: 'Progress', icon: TrendingDown },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`flex flex-col items-center gap-1 transition-all ${
              currentPage === item.id
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <item.icon size={24} />
            <span className="text-xs font-semibold">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ArtFlowApp;
