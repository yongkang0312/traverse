import { SetLanguageListTypeAction } from '@/infrastructure/redux/actions/SetLanguageListType.action';
import { languageListTypeReducer } from '@/infrastructure/redux/reducers/LanguageListType.reducer';
import { assert } from 'chai';


describe('LanguageDetail Reducer', () => {
  test('INITIAL_STATE languageListType is popular', () => {
    const action = { type: undefined };
    const expectedState = 'popular';
    const actualState = languageListTypeReducer(undefined, action);
    assert.strictEqual(actualState, expectedState);
  });

  test('SET_LANGUAGE updates the language reducer properly', () => {
    const language = 'all';
    const action = SetLanguageListTypeAction(language);
    const actualState = languageListTypeReducer(undefined, action);
    assert.strictEqual(actualState, language);
  });
});
