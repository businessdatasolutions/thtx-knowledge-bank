/**
 * Component Tests
 *
 * These are compile-time validation tests.
 * For full runtime testing, use a test framework like Jest + React Testing Library.
 */

import React from 'react';
import { Button } from '../Button';
import { Card } from '../Card';
import { ProgressBar } from '../ProgressBar';
import { Navigation } from '../Navigation';
import { TabGroup } from '../TabGroup';

// Test Button renders with different variants
const ButtonTests = () => (
  <>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
    <Button disabled>Disabled</Button>
    <Button loading>Loading</Button>
  </>
);

// Test Card renders with different props
const CardTests = () => (
  <>
    <Card>Simple card content</Card>
    <Card header={<h3>Header</h3>}>Card with header</Card>
    <Card footer={<p>Footer</p>}>Card with footer</Card>
    <Card onClick={() => console.log('clicked')}>Clickable card</Card>
    <Card isActive>Active card</Card>
    <Card isCompleted>Completed card</Card>
  </>
);

// Test ProgressBar displays correctly
const ProgressBarTests = () => (
  <>
    <ProgressBar value={50} />
    <ProgressBar value={75} showLabel />
    <ProgressBar currentStep={1} totalSteps={3} />
    <ProgressBar
      currentStep={2}
      totalSteps={3}
      stepLabels={['Data', 'Logic', 'Action']}
    />
    <ProgressBar value={100} size="sm" />
    <ProgressBar value={100} size="lg" />
  </>
);

// Test Navigation renders correctly
const NavigationTests = () => (
  <>
    <Navigation title="Page Title" />
    <Navigation title="With Subtitle" subtitle="Subtitle here" />
    <Navigation
      showBack
      onBack={() => console.log('back')}
    />
    <Navigation
      showForward
      onForward={() => console.log('forward')}
    />
    <Navigation
      title="Full Nav"
      showBack
      showForward
      onBack={() => {}}
      onForward={() => {}}
      language="NL"
      onLanguageChange={() => {}}
    />
  </>
);

// Test TabGroup renders correctly
const TabGroupTests = () => {
  const tabs = [
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' },
    { id: 'tab3', label: 'Tab 3' },
  ];

  return (
    <>
      <TabGroup
        tabs={tabs}
        activeTab="tab1"
        onChange={(id) => console.log(id)}
      />
      <TabGroup
        tabs={tabs}
        activeTab="tab2"
        onChange={() => {}}
        variant="pills"
      />
      <TabGroup
        tabs={tabs}
        activeTab="tab3"
        onChange={() => {}}
        variant="boxed"
      />
      <TabGroup
        tabs={tabs}
        activeTab="tab1"
        onChange={() => {}}
        fullWidth
      />
    </>
  );
};

// Export all tests for compilation validation
export {
  ButtonTests,
  CardTests,
  ProgressBarTests,
  NavigationTests,
  TabGroupTests,
};
