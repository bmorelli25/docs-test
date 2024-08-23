# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'Elastic'
copyright = '2024, Elasticsearch B.V. All Rights Reserved.'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
    'myst_parser',
    'sphinx_design',
    'sphinx_rtd_theme',
    'sphinx.ext.duration',
    'sphinx_copybutton',
    'sphinx_togglebutton',
    'sphinxcontrib.mermaid'
]

templates_path = ['_templates']
exclude_patterns = []

myst_enable_extensions = [
    'substitution',
]

myst_substitutions = {
    'project': "MarkItPy",
    'fleet': "Fleet",
}

myst_title_to_header = True
myst_heading_anchors = 0

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'furo'
# html_static_path = ['_static']
#html_sidebars = {
#    '**': [
#        'globaltoc.html'
#    ]
#}