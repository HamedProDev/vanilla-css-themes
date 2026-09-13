/**
 * fanta.js — minimal vanilla-JS behavior for Fanta.css's interactive
 * components (dropdown, modal, offcanvas, tabs, accordion, popover).
 *
 * Mirrors Bootstrap's data-attribute API so markup stays declarative:
 *   <button data-toggle="dropdown" data-target="#menu1">Menu</button>
 *   <button data-toggle="modal" data-target="#exampleModal">Open</button>
 *   <button data-toggle="offcanvas" data-target="#sidebar">Menu</button>
 *   <button data-toggle="tab" data-target="#pane1">Tab 1</button>
 *   <button data-toggle="accordion" data-target="#item1">Section 1</button>
 *   <button data-toggle="popover" data-target="#pop1">Info</button>
 *   <[any] data-dismiss="modal|offcanvas|dropdown">Close</[any]>
 *
 * No dependencies. Include after fanta.css, once per page.
 */
(function () {
  function closeAllDropdowns(except) {
    document.querySelectorAll('.dropdown-menu.show').forEach(function (el) {
      if (el !== except) el.classList.remove('show');
    });
  }

  function closeAllPopovers(except) {
    document.querySelectorAll('.popover.show').forEach(function (el) {
      if (el !== except) el.classList.remove('show');
    });
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-toggle]');
    var dismiss = e.target.closest('[data-dismiss]');

    if (dismiss) {
      var kind = dismiss.getAttribute('data-dismiss');
      var host = dismiss.closest('.' + kind);
      if (host) host.classList.remove('show');
      return;
    }

    if (!trigger) {
      // Clicking outside a dropdown/popover closes it.
      if (!e.target.closest('.dropdown')) closeAllDropdowns();
      if (!e.target.closest('.popover') && !e.target.closest('[data-toggle="popover"]')) closeAllPopovers();
      return;
    }

    var type = trigger.getAttribute('data-toggle');
    var targetSel = trigger.getAttribute('data-target');
    var target = targetSel ? document.querySelector(targetSel) : null;

    if (type === 'dropdown' && target) {
      var isOpen = target.classList.contains('show');
      closeAllDropdowns();
      target.classList.toggle('show', !isOpen);
    }

    if (type === 'modal' && target) {
      target.classList.add('show');
    }

    if (type === 'offcanvas' && target) {
      target.classList.add('show');
    }

    if (type === 'popover' && target) {
      var wasOpen = target.classList.contains('show');
      closeAllPopovers();
      target.classList.toggle('show', !wasOpen);
    }

    if (type === 'tab' && target) {
      var tabGroup = trigger.closest('.nav-tabs');
      var paneGroup = target.closest('.tab-content');
      if (tabGroup) tabGroup.querySelectorAll('.nav-link').forEach(function (l) { l.classList.remove('active'); });
      if (paneGroup) paneGroup.querySelectorAll('.tab-pane').forEach(function (p) { p.classList.remove('active'); });
      trigger.classList.add('active');
      target.classList.add('active');
    }

    if (type === 'accordion' && target) {
      var isShown = target.classList.contains('show');
      target.classList.toggle('show', !isShown);
      trigger.classList.toggle('active', !isShown);
    }
  });

  // Escape closes modal/offcanvas/dropdown/popover.
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.modal.show, .offcanvas.show').forEach(function (el) {
      el.classList.remove('show');
    });
    closeAllDropdowns();
    closeAllPopovers();
  });

  // Clicking the modal backdrop (not the dialog) closes it.
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal') && e.target.classList.contains('show')) {
      e.target.classList.remove('show');
    }
  });
})();
