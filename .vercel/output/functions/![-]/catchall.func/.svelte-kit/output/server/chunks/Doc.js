;
!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "f59fb5d3-1779-4961-aa1b-883521a97302", e._sentryDebugIdIdentifier = "sentry-dbid-f59fb5d3-1779-4961-aa1b-883521a97302");
  } catch (e2) {
  }
}();
import { c as create_ssr_component, a as subscribe } from "./ssr.js";
import { w as writable } from "./index.js";
import { doc, onSnapshot } from "firebase/firestore";
import { g as getFirebaseContext } from "./Icon.js";
function docStore(firestore, ref, startWith) {
  let unsubscribe;
  if (!globalThis.window) {
    const { subscribe: subscribe3 } = writable(startWith);
    return {
      subscribe: subscribe3,
      ref: null,
      id: ""
    };
  }
  if (!firestore) {
    console.warn("Firestore is not initialized. Are you missing FirebaseApp as a parent component?");
    const { subscribe: subscribe3 } = writable(null);
    return {
      subscribe: subscribe3,
      ref: null,
      id: ""
    };
  }
  const docRef = typeof ref === "string" ? doc(firestore, ref) : ref;
  const { subscribe: subscribe2 } = writable(startWith, (set) => {
    unsubscribe = onSnapshot(docRef, (snapshot) => {
      set(snapshot.data() ?? null);
    });
    return () => unsubscribe();
  });
  return {
    subscribe: subscribe2,
    ref: docRef,
    id: docRef.id
  };
}
const Doc = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $store, $$unsubscribe_store;
  let { ref } = $$props;
  let { startWith = void 0 } = $$props;
  const { firestore } = getFirebaseContext();
  let store = docStore(firestore, ref, startWith);
  $$unsubscribe_store = subscribe(store, (value) => $store = value);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
  if ($$props.startWith === void 0 && $$bindings.startWith && startWith !== void 0) $$bindings.startWith(startWith);
  $$unsubscribe_store();
  return `${$store !== void 0 && $store !== null ? `${slots.default ? slots.default({ data: $store, ref: store.ref, firestore }) : ``}` : `${slots.loading ? slots.loading({}) : ``}`}`;
});
export {
  Doc as D
};
//# sourceMappingURL=Doc.js.map
