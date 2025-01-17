/* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/publicdomain/zero/1.0/
 */

// Bug 608316 - Test that opening the manager to an add-on that doesn't exist
// just loads the default view

var gCategoryUtilities;

// Not implemented yet on HTML about:addons (Bug 1552184), once supported
// this test case will be included in the HTML about:addons test files.
SpecialPowers.pushPrefEnv({
  set: [["extensions.htmlaboutaddons.enabled", false]],
});

function test() {
  waitForExplicitFinish();

  run_next_test();
}

function end_test() {
  finish();
}

add_test(async function() {
  let aManager = await open_manager("addons://detail/foo");
  gCategoryUtilities = new CategoryUtilities(aManager);
  is(gCategoryUtilities.selectedCategory, "discover", "Should fall back to the discovery pane");

  close_manager(aManager, run_next_test);
});

// Also test that opening directly to an add-on that does exist doesn't break
// and selects the right category
add_test(async function() {
  new MockProvider().createAddons([{
    id: "addon1@tests.mozilla.org",
    name: "addon 1",
    version: "1.0",
  }]);

  let aManager = await open_manager("addons://detail/addon1@tests.mozilla.org");
  gCategoryUtilities = new CategoryUtilities(aManager);
  is(gCategoryUtilities.selectedCategory, "extension", "Should have selected the right category");

  close_manager(aManager, run_next_test);
});
