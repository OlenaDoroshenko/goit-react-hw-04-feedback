import React, { useState } from 'react';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Section from './Section/Section';
import Notification from './Notification/Notification';
import css from './App.module.css';
import { useEffect } from 'react';

export default function App() {
  const [options, setOptions] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const [totalFeedback, setTotalFeedback] = useState(0);
  const [positivePercentage, setPositivePercentage] = useState(0);

  const onLeaveFeedback = optionName => {
    setOptions({ ...options, [optionName]: options[optionName] + 1 });
  };

  useEffect(() => {
    const { good, neutral, bad } = options;
    setTotalFeedback(good + neutral + bad);
    setPositivePercentage(Math.round((good / (good + neutral + bad)) * 100));
  }, [options]);

  return (
    <div className={css.container}>
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={onLeaveFeedback} />
      </Section>
      {totalFeedback > 0 ? (
        <Section title="Statistics">
          <Statistics
            good={options.good}
            neutral={options.neutral}
            bad={options.bad}
            total={totalFeedback}
            positivePercentage={positivePercentage}
          />
        </Section>
      ) : (
        <Notification message="There is no feedback." />
      )}
    </div>
  );
}
