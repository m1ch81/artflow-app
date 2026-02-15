import React, { useState, useEffect } from 'react';
import { Heart, Palette, TrendingDown, Zap, BookOpen, Settings, Menu, X, ChevronRight, Award } from 'lucide-react';

const ArtFlowApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [anxietyLevel, setAnxietyLevel] = useState(5);
  const [sessions, setSessions] = useState([
    { id: 1, name: 'Today', anxiety: 7, mood: 'stressed', activities: 1 },
    { id: 2, name: 'Yesterday', anxiety: 6, mood: 'anxious', activities: 2 },
    { id: 3, name: '2 days ago', anxiety: 8, mood: 'overwhelmed', activities: 0 },
  ]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(600);

  useEffect(() => {
    let interval;
    if (timerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeRemaining]);

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
      {/* Header Card */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
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
            onChange={(e) => setAnxietyLevel(Number(e.target.value))}
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

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-2xl p-4 text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-300">7</div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Sessions</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-2xl p-4 text-center">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-300">↓ 2pts</div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">This Week</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/30 rounded-2xl p-4 text-center">
          <div className="text-3xl font-bold text-green-600 dark:text-green-300">5</div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Streak Days</p>
        </div>
      </div>

      {/* Recommended Activities */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Zap size={24} /> Pick an Activity
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activities.slice(0, 6).map(activity => (
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

      {/* Activity Header */}
      <div className={`bg-gradient-to-br ${selectedActivity?.color} rounded-3xl p-8 text-white text-center shadow-xl`}>
        <div className="text-6xl mb-4">{selectedActivity?.emoji}</div>
        <h3 className="text-3xl font-bold mb-2">{selectedActivity?.title}</h3>
        <p className="text-white/90">{selectedActivity?.description}</p>
      </div>

      {/* Timer */}
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

      {/* Instructions */}
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

      {/* Reflection */}
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
          <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-xl transition">
            Finish & Save
          </button>
        </div>
      </div>
    </div>
  );

  const TrackingPage = () => (
    <div className="space-y-6 pb-8">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <TrendingDown size={24} /> Your Progress
      </h2>

      {/* Anxiety Trend */}
      <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-6">
        <h3 className="font-bold mb-4">Anxiety Trend (This Week)</h3>
        <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-2xl flex items-end justify-around p-4">
          {[8, 7, 6, 7, 5, 4, 5].map((val, i) => (
            <div
              key={i}
              className="w-6 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t"
              style={{ height: `${(val / 10) * 100}%` }}
              title={`Day ${i + 1}: ${val}/10`}
            />
          ))}
        </div>
        <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">
          <p>📉 <strong>-3 points</strong> compared to last week</p>
          <p className="mt-1">Keep up the great work! You're managing anxiety better.</p>
        </div>
      </div>

      {/* Recent Sessions */}
      <div>
        <h3 className="font-bold mb-3">Recent Sessions</h3>
        <div className="space-y-2">
          {sessions.map(session => (
            <div key={session.id} className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold">{session.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Anxiety: {session.anxiety}/10 • Mood: {session.mood}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-blue-600">{session.activities}</p>
                <p className="text-xs text-slate-500">activities</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="font-bold mb-3 flex items-center gap-2">
          <Award size={20} /> Achievements
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl p-4 text-center">
            <div className="text-4xl mb-2">🎯</div>
            <p className="text-xs font-semibold">First Step</p>
          </div>
          <div className="bg-purple-100 dark:bg-purple-900/30 rounded-2xl p-4 text-center opacity-50">
            <div className="text-4xl mb-2">🔥</div>
            <p className="text-xs font-semibold">7 Day Streak</p>
          </div>
          <div className="bg-blue-100 dark:bg-blue-900/30 rounded-2xl p-4 text-center opacity-50">
            <div className="text-4xl mb-2">🎨</div>
            <p className="text-xs font-semibold">All 6 Modules</p>
          </div>
        </div>
      </div>
    </div>
  );

  const ResourcesPage = () => (
    <div className="space-y-6 pb-8">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <BookOpen size={24} /> Resources & Help
      </h2>

      {/* Crisis Resources */}
      <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-2xl p-6">
        <h3 className="font-bold text-red-700 dark:text-red-400 mb-3">⚠️ In Crisis?</h3>
        <p className="text-sm mb-4 dark:text-slate-200">You're not alone. Reach out to someone who can help right now.</p>
        <div className="space-y-2">
          <a href="tel:988" className="block bg-red-600 text-white p-3 rounded-xl font-bold text-center hover:bg-red-700 transition">
            📞 Call 988 (Suicide & Crisis Lifeline)
          </a>
          <a href="sms:741741" className="block bg-red-600 text-white p-3 rounded-xl font-bold text-center hover:bg-red-700 transition">
            💬 Text HOME to 741741 (Crisis Text Line)
          </a>
        </div>
      </div>

      {/* About */}
      <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6">
        <h3 className="font-bold mb-3">About ArtFlow</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
          ArtFlow is a psychologically-informed art therapy tool designed to help teenagers manage anxiety and stress through creative expression.
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          ⚠️ <strong>Important:</strong> This app is not a replacement for therapy. If you're experiencing persistent anxiety, please talk to a parent, counselor, or therapist.
        </p>
      </div>

      {/* Tips */}
      <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6">
        <h3 className="font-bold mb-3">💡 Tips for Success</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex gap-2">
            <span>✓</span>
            <span>Set a regular time each day for your art practice</span>
          </li>
          <li className="flex gap-2">
            <span>✓</span>
            <span>There's no "right" or "wrong" art—just express yourself</span>
          </li>
          <li className="flex gap-2">
            <span>✓</span>
            <span>Start with short 5-10 minute sessions if anxious</span>
          </li>
          <li className="flex gap-2">
            <span>✓</span>
            <span>Track your progress to see patterns</span>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 dark:text-white">
      {/* Header */}
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

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
            <nav className="max-w-4xl mx-auto px-4 py-3 space-y-2">
              {[
                { id: 'home', label: 'Home', icon: Palette },
                { id: 'tracking', label: 'Progress', icon: TrendingDown },
                { id: 'resources', label: 'Resources', icon: BookOpen },
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

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'activity' && <ActivityPage />}
        {currentPage === 'tracking' && <TrackingPage />}
        {currentPage === 'resources' && <ResourcesPage />}
      </main>

      {/* Bottom Navigation (Desktop) */}
      <nav className="hidden md:flex fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-800 shadow-xl rounded-full px-8 py-4 gap-6 border border-slate-200 dark:border-slate-700">
        {[
          { id: 'home', label: 'Home', icon: Palette },
          { id: 'tracking', label: 'Progress', icon: TrendingDown },
          { id: 'resources', label: 'Help', icon: BookOpen },
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
