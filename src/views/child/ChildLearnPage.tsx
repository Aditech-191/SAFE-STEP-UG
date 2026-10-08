import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw,
  Check,
  Shield,
  Lightbulb
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Lesson } from '../../types';

export const ChildLearnPage: React.FC = () => {
  const { lessons, completeLesson, childProfile } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(lessons[0]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);

  const categories = [
    'All',
    'Cyberbullying',
    'Privacy',
    'Password Safety',
    'Grooming Awareness',
    'Harmful Content',
    'Sextortion Awareness',
    'Social Media Safety',
    'Digital Footprint',
    'Safe Reporting'
  ];

  const filteredLessons = activeCategory === 'All' 
    ? lessons 
    : lessons.filter(l => l.category === activeCategory);

  const handleSelectOption = (optionId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(optionId);
  };

  const handleCheckAnswer = () => {
    if (!selectedOptionId) return;
    setIsAnswerSubmitted(true);
    const chosen = selectedLesson.options.find(o => o.id === selectedOptionId);
    if (chosen && chosen.isCorrect) {
      completeLesson(selectedLesson.id, selectedLesson.points);
    }
  };

  const handleNextLesson = () => {
    const currentIndex = lessons.findIndex(l => l.id === selectedLesson.id);
    const nextIndex = (currentIndex + 1) % lessons.length;
    setSelectedLesson(lessons[nextIndex]);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
  };

  const handleResetCurrent = () => {
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
  };

  const chosenOption = selectedLesson.options.find(o => o.id === selectedOptionId);
  const isCorrectAnswer = chosenOption?.isCorrect;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header with Gamification Points */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="yellow" size="md">Interactive Learning Centre</Badge>
            <span className="text-xs text-slate-400 font-mono">Uganda Digital Literacy</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-100 mt-1">
            Real-Life Digital Safety Scenarios
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Play real-life scenario questions, earn safety points, and unlock your protective badges.
          </p>
        </div>

        {/* Child's Points Scorecard */}
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#121B33] border border-amber-500/30 shadow-glow-yellow">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xl">
            🏆
          </div>
          <div>
            <div className="text-lg font-extrabold text-amber-400 font-mono">
              {childProfile.safetyPoints} pts
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              {childProfile.completedLessons.length} / {lessons.length} Modules Completed
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              const firstMatch = cat === 'All' ? lessons[0] : lessons.find(l => l.category === cat);
              if (firstMatch) {
                setSelectedLesson(firstMatch);
                setSelectedOptionId(null);
                setIsAnswerSubmitted(false);
              }
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              activeCategory === cat
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-sm'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Two Column Layout: Active Interactive Quiz vs Lesson List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Active Interactive Scenario Quiz */}
        <div className="lg:col-span-8 space-y-6">
          <Card variant="shield" className="p-6 sm:p-8 space-y-6">
            
            {/* Lesson Title & Points Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider block">
                  [{selectedLesson.category}]
                </span>
                <h2 className="text-xl font-bold text-slate-100 mt-1">
                  {selectedLesson.title}
                </h2>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30">
                +{selectedLesson.points} Points
              </span>
            </div>

            {/* Scenario Box (Section 15 Requirement) */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase font-mono">
                Real-Life Scenario:
              </span>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-200 text-sm leading-relaxed italic">
                "{selectedLesson.scenario}"
              </div>
            </div>

            {/* "What would you do?" Question */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <span className="text-cyan-400 font-mono">?</span>
                <span>{selectedLesson.question}</span>
              </h3>

              {/* Options */}
              <div className="space-y-2.5">
                {selectedLesson.options.map(option => {
                  const isSelected = selectedOptionId === option.id;
                  let borderClass = 'border-slate-800 bg-slate-900/60 hover:border-slate-700';

                  if (isAnswerSubmitted) {
                    if (option.isCorrect) {
                      borderClass = 'border-emerald-500 bg-emerald-950/30 text-emerald-200 ring-1 ring-emerald-500';
                    } else if (isSelected && !option.isCorrect) {
                      borderClass = 'border-red-500 bg-red-950/30 text-red-200 ring-1 ring-red-500';
                    }
                  } else if (isSelected) {
                    borderClass = 'border-cyan-400 bg-cyan-950/40 text-cyan-200 ring-1 ring-cyan-400';
                  }

                  return (
                    <button
                      key={option.id}
                      type="button"
                      disabled={isAnswerSubmitted}
                      onClick={() => handleSelectOption(option.id)}
                      className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start gap-3 ${borderClass}`}
                    >
                      <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center font-mono text-xs font-bold uppercase flex-shrink-0 mt-0.5">
                        {option.id}
                      </span>
                      <span className="flex-1 text-slate-200">{option.text}</span>
                      {isAnswerSubmitted && option.isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      )}
                      {isAnswerSubmitted && isSelected && !option.isCorrect && (
                        <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Bar */}
            {!isAnswerSubmitted ? (
              <div className="flex justify-end pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleCheckAnswer}
                  disabled={!selectedOptionId}
                >
                  Confirm My Answer
                </Button>
              </div>
            ) : (
              /* Explanation & Safety Tip After Submission */
              <div className="space-y-4 pt-2 animate-in fade-in duration-200">
                <div className={`p-4 rounded-2xl border ${isCorrectAnswer ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-amber-950/20 border-amber-500/30'} space-y-2`}>
                  <div className="flex items-center gap-2">
                    {isCorrectAnswer ? (
                      <span className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Correct! +{selectedLesson.points} Safety Points Earned!</span>
                      </span>
                    ) : (
                      <span className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4" />
                        <span>Here's the Best Way to Stay Safe:</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedLesson.explanation}
                  </p>
                  <div className="pt-2 border-t border-slate-800/80 text-xs text-amber-300 font-semibold flex items-center gap-1.5">
                    <span>💡 Safety Rule:</span>
                    <span>{selectedLesson.safetyTip}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <Button variant="ghost" size="sm" onClick={handleResetCurrent} icon={<RotateCcw className="w-4 h-4" />}>
                    Try Again
                  </Button>
                  <Button variant="yellow" size="md" onClick={handleNextLesson} icon={<ArrowRight className="w-4 h-4" />}>
                    Next Scenario
                  </Button>
                </div>
              </div>
            )}

          </Card>
        </div>

        {/* Right Column: Lesson Browser Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h4 className="text-xs font-bold text-slate-400 uppercase font-mono tracking-wider">
              Modules in this category:
            </h4>
            <span className="text-xs text-slate-400">{filteredLessons.length}</span>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredLessons.map(lesson => {
              const isSelected = selectedLesson.id === lesson.id;
              const isDone = childProfile.completedLessons.includes(lesson.id);

              return (
                <div
                  key={lesson.id}
                  onClick={() => {
                    setSelectedLesson(lesson);
                    setSelectedOptionId(null);
                    setIsAnswerSubmitted(false);
                  }}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-md ring-1 ring-cyan-400'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono text-slate-400 font-semibold uppercase">
                      {lesson.category}
                    </span>
                    {isDone && (
                      <span className="text-emerald-400 text-[11px] font-bold flex items-center gap-0.5">
                        <Check className="w-3 h-3" /> Done
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-100 line-clamp-1">
                    {lesson.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                    <span>{lesson.durationMinutes} min</span>
                    <span className="text-amber-400 font-mono font-bold">+{lesson.points} pts</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
