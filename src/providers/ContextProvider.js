import React from 'react';
import { AwsProvider } from './AwsProvider';
import { ClassProvider } from './ClassProvider';
import { ClassTypeProvider } from './ClassTypeProvider';
import { LabsProvider } from './LabsProvider';
import { QuestionsProvider } from './QuestionsProvider';
import { TestsProvider } from './TestsProvider';
import { NavigationProvider } from './NavigationProvider';
import { GlobalProvider } from './GlobalProvider';
import { QuestionCategoryProvider } from './QuestionCategoryProvider';
import { UserProvider } from './UserProvider';

function ProviderComposer({ contexts, children }) {
    return contexts.reduceRight(
      (kids, parent) =>
        React.cloneElement(parent, {
          children: kids,
        }),
      children
    );
  }

export function ContextProvider({ children }) {
    return (
    <ProviderComposer
      contexts={[<GlobalProvider />, <AwsProvider />, <ClassProvider />, <ClassTypeProvider />, 
        <LabsProvider />, <QuestionsProvider />, <TestsProvider />, <NavigationProvider />,
        <QuestionCategoryProvider />, <UserProvider />
      ]}
    >
    {children}
    </ProviderComposer>
  );
}

export default ContextProvider;