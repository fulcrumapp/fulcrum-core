# An introduction to Fulcrum Core

## What is it?
Fulcrum Core is "The JavaScript object model for Fulcrum." But what exactlly does
that mean?

Within the Fulcrum ecosystem, data can take many shapes. For example, the source of
truth for a Record's field values are nothing but key/value pairs within a JSON blob.
Though effecient, this structure is not developer (or User) friendly. Much of Fulcrum's
"secret sauce" comes from being able to convert data back and forth between various
structures.

Fulcrum Core provides an abstraction for objects so they're easier to work with in
Javascript/Typescript. From fetching data to validating User inputs, the library offers
a consistent set of functions that can be used in any project. To get a sense of how
complex working without this abstraction would be, consider how much logic is involved
with providing a ChoiceValue for the User. We must:
- Get the ChoiceList
  - This may be defined on the Form
  - It may also be a standalone ChoiceList
- Determine whether:
  - this is a read-only or editable field
  - "other" (non-defined) values are allowed
  - a specific number of choices are allowed
  - the value can/can't be left empty

Considering ChoiceLists are simple compared to ClassificationSets, Repeatables and
RecordLinks, the necessity and desire to have something like Fulcrum Core becomes
clear. When the library was first implemented, it provided a lot power and efficiency.

Over the years, many of these problems have been solved and made available
through open source projects. For example, the `DataSource` class handles CRUD
operations with the server, and includes caching to reduce unneeded network calls.
Today, tools like [TanStack Query](https://tanstack.com) and
[RTK Toolkit](https://redux-toolkit.js.org/rtk-query/overview) cover a lot of the same
concerns, complete with community support, documentation and accessible source code.

Unfortunately, replacing `DataSource` would require significant effort and opens up a
lot of risk. Unlike the tools mentioned above, `DataSource` is integral to Fulcrum
Core, just as other parts of Fulcrum Core are intertwined and tightly bound to other
parts of the library. And again, this library is "The Javascript object model for
Fulcrum", so it is widely used and mission critical for many Fulcrum features.

## How does it work?
It's assumed the reader is familiar with Fulcrum, the relationship
between Forms and their Records, and how they are structured and 
persisted (hint: they're JSON blogs). With all of this knowledge, it may
still not be obvious that each field is represented and defined as an 
"Element" on the Form, and the field can only have a "Value" when it is
contained with a Record. However, this distinction is important within
Fulcrum Core, as `elements` and `values` (or `form_values`) are central
to the library.

If one were to criticize the architecture of Fulcrum Core, they might point out the 
hierarchical class structure and overreliance on inheritance. Though the early
developers may have had other ideas in mind, it might appear to new-comers that
Fulcrum Core was trying to mimic the same OOP approach on the server. Considering Ruby
(where _everything_ is a Class) and Javascript (which uses prototypical object
creation) are such different languages, the result is a library that may not feel very
idomatic to developers new to Fulcrum source code.

We can see the OOP mindset when looking into both `elements` and `values`. Both
`src/elements/element.js` and `src/values/form_value.js` provide the base classes.
Some classes within the heirarchy seem to have little purpose, such as
`TextualElement`. However, there is an equivilent `TexturalValue` class with provides
significant functionality, so perhaps `TextualElement` and the like were intended to
be Marker classes.

Both `elements` and `values` directories sprinkle in a few helper classes alongside
Element and Value classes. In the `utils` directory, we find more serious "util"
classes, along with concrete `DataSource` classes. The `validation` directory holds
validating functions and errors, while `media` holds media specific classes. Finally,
the top level `src` directory holds our main object types, the `DataSource` class and
an index file to expose all of the classes of the library.

## Where is it used?
As "The Javascript object model for Fulcrum", it should be no surpise that Fulcrum Core
is used in many projects and libraries. This includes, but is not necassarily limited
to:
- Fulcrum Components (a.k.a. Fulcrum Web)
- Query
- Fulcrum Query SQL
- Reports and Report Generator
- DataExports
- External Contributions

For new development, there may be better choices than leveraging Fulcrum Core. However,
when extending existing functionality that already uses the library, it may be faster
and safer to continue using it. Taking a walk through the project, and making sure
you're familiar with the concepts, constructs and complexities of the library will make
future work much less confusing and error prone.
