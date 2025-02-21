import { Localized } from '@fluent/react';
import React, { useContext, useState } from 'react';
import Tour, { ReactourStep } from 'reactour';

import { updateTourStatus } from '~/api/user';
import { Locale } from '~/context/Locale';
import { useProject } from '~/modules/project';
import { USER } from '~/modules/user';
import { useAppSelector } from '~/hooks';
import { useTranslator } from '~/hooks/useTranslator';

import './InteractiveTour.css';

/**
 * Interactive Tour to be displayed on the "Tutorial" project
 * introducing the translate page of Pontoon.
 */
export function InteractiveTour(): React.ReactElement | null {
  const { code } = useContext(Locale);
  const { slug } = useProject();
  const { isAuthenticated, tourStatus } = useAppSelector(
    (state) => state[USER],
  );
  const isTranslator = useTranslator();
  const [isOpen, setOpen] = useState(true);

  // Run the tour only on project with slug 'tutorial'
  // and if the user hasn't completed it yet
  if (slug !== 'tutorial' || tourStatus === -1) {
    return null;
  }

  const steps: ReactourStep[] = [
    {
      selector: '',
      content: (
        <div>
          <Localized id='interactivetour-InteractiveTour--intro-title'>
            <h3>Hey there!</h3>
          </Localized>
          <Localized id='interactivetour-InteractiveTour--intro-content'>
            <p>
              Pontoon is a localization platform by Mozilla, used to localize
              Firefox and various other projects at Mozilla and other
              organizations.
            </p>
          </Localized>
          <Localized id='interactivetour-InteractiveTour--intro-footer'>
            <p>Follow this guide to learn how to use it.</p>
          </Localized>
        </div>
      ),
    },
    {
      selector: '#app > header',
      content: (
        <div>
          <Localized id='interactivetour-InteractiveTour--main-toolbar-title'>
            <h3>Main toolbar</h3>
          </Localized>
          <Localized id='interactivetour-InteractiveTour--main-toolbar-content'>
            <p>
              The main toolbar located on top of the screen shows the language,
              project and resource currently being localized. You can also see
              the progress of your current localization and additional project
              information.
            </p>
          </Localized>
          <Localized id='interactivetour-InteractiveTour--main-toolbar-footer'>
            <p>
              On the right hand side, logged in users can access notifications
              and settings.
            </p>
          </Localized>
        </div>
      ),
      style: {
        margin: '15px',
      },
    },
    {
      selector: '#app > .main-content > .panel-list',
      content: (
        <div>
          <Localized id='interactivetour-InteractiveTour--string-list-title'>
            <h3>String List</h3>
          </Localized>
          <Localized id='interactivetour-InteractiveTour--string-list-content'>
            <p>
              The sidebar displays a list of strings in the current
              localization. Status of each string (e.g. Translated or Missing)
              is indicated by a different color of the square on the left. The
              square also acts as a checkbox for selecting strings to perform
              mass actions on.
            </p>
          </Localized>
          <Localized id='interactivetour-InteractiveTour--string-list-footer'>
            <p>
              On top of the list is a search box, which allows you to search
              source strings, translations, comments and string IDs.
            </p>
          </Localized>
        </div>
      ),
      style: {
        margin: '15px',
      },
    },
    {
      selector: '#app > .main-content > .panel-list',
      content: (
        <div>
          <Localized id='interactivetour-InteractiveTour--filters-title'>
            <h3>Filters</h3>
          </Localized>
          <Localized id='interactivetour-InteractiveTour--filters-content'>
            <p>
              Strings can also be filtered by their status, translation time,
              translation authors and other criteria. Note that filter icons act
              as checkboxes, which allows you to filter by multiple criteria.
            </p>
          </Localized>
        </div>
      ),
      action: (node) =>
        node.querySelector('.filters-panel .visibility-switch').click(),
    },
    {
      selector: '#app > .main-content > .panel-content',
      content: (
        <div>
          <Localized id='interactivetour-InteractiveTour--editor-title'>
            <h3>Editor</h3>
          </Localized>
          <Localized id='interactivetour-InteractiveTour--editor-content'>
            <p>
              Clicking a string in the list opens it in the editor. On top of
              it, you can see the source string with its context. Right under
              that is the translation input to type translation in, followed by
              the translation toolbar.
            </p>
          </Localized>
        </div>
      ),
    },
    {
      selector: '#app > .main-content > .panel-content .editor',
      content: (
        <div>
          <Localized id='interactivetour-InteractiveTour--submit-title'>
            <h3>Submit a Translation</h3>
          </Localized>
          {!isAuthenticated ? (
            <Localized id='interactivetour-InteractiveTour--submit-content-unauthenticated'>
              <p>
                A user needs to be logged in to be able to submit translations.
                Non-authenticated users will see a link to Sign in instead of
                the translation toolbar with a button to save translations.
              </p>
            </Localized>
          ) : !isTranslator ? (
            <Localized id='interactivetour-InteractiveTour--submit-content-contributor'>
              <p>
                When a translator is in Suggest Mode, or doesn’t have permission
                to submit translations directly, a blue SUGGEST button will
                appear in the translation toolbar. To make a suggestion, type it
                in the translation input and click SUGGEST.
              </p>
            </Localized>
          ) : (
            <Localized id='interactivetour-InteractiveTour--submit-content-translator'>
              <p>
                If a translator has permission to add translations directly, the
                green SAVE button will appear in the translation toolbar. To
                submit a translation, type it in the translation input and click
                SAVE.
              </p>
            </Localized>
          )}
        </div>
      ),
    },
    {
      selector:
        '#app > .main-content > .panel-content .entity-details .history',
      content: (
        <div>
          <Localized id='interactivetour-InteractiveTour--history-title'>
            <h3>History</h3>
          </Localized>
          <Localized id='interactivetour-InteractiveTour--history-content'>
            <p>
              All suggestions and translations submitted for the current string
              can be found in the History Tab. Icons to the right of each entry
              indicate its review status (Approved, Rejected or Unreviewed).
            </p>
          </Localized>
        </div>
      ),
    },
    {
      selector:
        '#app > .main-content > .panel-content .entity-details .third-column .top .react-tabs',
      content: (
        <div>
          <Localized id='interactivetour-InteractiveTour--terms-title'>
            <h3>Terms</h3>
          </Localized>
          <Localized id='interactivetour-InteractiveTour--terms-content'>
            <p>
              The Terms panel contains specialized words (terms) found in the
              source string, along with their definitions, usage examples, part
              of speech and translations. By clicking on a term, its translation
              gets inserted into the editor.
            </p>
          </Localized>
        </div>
      ),
      action: (node) => node.querySelector('#react-tabs-0').click(),
    },
    {
      selector:
        '#app > .main-content > .panel-content .entity-details .third-column .top .react-tabs',
      content: (
        <div>
          <Localized id='interactivetour-InteractiveTour--comments-title'>
            <h3>Comments</h3>
          </Localized>
          <Localized id='interactivetour-InteractiveTour--comments-content'>
            <p>
              In the Comments tab you can discuss how to translate content with
              your fellow team members. It’s also the place where you can
              request more context about or report an issue in the source
              string.
            </p>
          </Localized>
        </div>
      ),
      action: (node) => node.querySelector('#react-tabs-2').click(),
    },
    {
      selector:
        '#app > .main-content > .panel-content .entity-details .third-column .bottom .react-tabs',
      content: (
        <div>
          <Localized id='interactivetour-InteractiveTour--machinery-title'>
            <h3>Machinery</h3>
          </Localized>
          <Localized id='interactivetour-InteractiveTour--machinery-content'>
            <p>
              The Machinery tab shows automated translation suggestions from
              Machine Translation, Translation Memory and Terminology services.
              Clicking on an entry copies it to the translation input.
            </p>
          </Localized>
        </div>
      ),
      action: (node) => node.querySelector('#react-tabs-4').click(),
    },
    {
      selector:
        '#app > .main-content > .panel-content .entity-details .third-column .bottom .react-tabs',
      content: (
        <div>
          <Localized id='interactivetour-InteractiveTour--locales-title'>
            <h3>Locales</h3>
          </Localized>
          <Localized id='interactivetour-InteractiveTour--locales-content'>
            <p>
              Sometimes it’s useful to see general style choices by other
              localization communities. Approved translations of the current
              string to other languages are available in the Locales tab.
            </p>
          </Localized>
        </div>
      ),
      action: (node) => node.querySelector('#react-tabs-6').click(),
    },
    {
      selector: '',
      content: (
        <div>
          <Localized id='interactivetour-InteractiveTour--end-title'>
            <h3>That’s (not) all, folks!</h3>
          </Localized>
          <Localized
            id='interactivetour-InteractiveTour--end-content'
            elems={{
              a: (
                // eslint-disable-next-line
                <a href='https://mozilla-l10n.github.io/localizer-documentation/' />
              ),
            }}
          >
            <p>{`There’s a wide variety of tools to help you with translations,
              some of which we didn’t mention in this tutorial. For more
              topics of interest for localizers at Mozilla, please have a look
              at the <a>Localizer Documentation</a>.`}</p>
          </Localized>
          <Localized
            id='interactivetour-InteractiveTour--end-footer'
            elems={{ a: <a href={`/${code}/`} /> }}
          >
            <p>{`Next, feel free to explore this tutorial project or move straight
              to <a>translating live projects</a>.`}</p>
          </Localized>
        </div>
      ),
    },
  ];

  const updateTourStatus_ = isAuthenticated
    ? undefined
    : (currentStep: number) => {
        const step = currentStep === steps.length - 1 ? -1 : currentStep + 1;
        updateTourStatus(step);
      };

  return (
    <Tour
      accentColor={'#F36'}
      className={'interactive-tour'}
      closeWithMask={false}
      getCurrentStep={updateTourStatus_}
      isOpen={isOpen}
      onRequestClose={() => setOpen(false)}
      maskSpace={0}
      startAt={tourStatus ?? 0}
      steps={steps}
    />
  );
}
